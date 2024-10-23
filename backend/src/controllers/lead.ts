import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Lead from "../models/lead"; // Import the Lead model
import { CustomRequest } from "../middleware/auth";
import Location from "../models/location";
import Service from "../models/service";
import { uploadMediaToS3 } from "../utils/media";
import Conversation from "../models/conversation";

// Create Lead Controller
export const createLead = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation errors",
      errors: errors.array(),
    });
    return;
  }

  try {
    const {
      customerName,
      email,
      phone,
      contactMethod,
      address,
      serviceRequestDate,
      details,
      location,
      service,
      uploadedMedia,
    } = req.body;

    const existService = await Service.findById(service);

    if (!existService) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }
    const existLocation = await Location.findById(location);

    if (!existLocation) {
      res.status(404).json({
        message: "Location not found",
      });
      return;
    }

    if (userId?.toString() === existService.user.toString()) {
      res.status(404).json({
        message: "Can not make enquiring about your Service",
      });
      return;
    }

    const imageUploadPromises: Promise<any>[] = [];
    console.log(req.files);
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        imageUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const imageUploadResults = await Promise.all(imageUploadPromises);
    console.log(imageUploadResults);

    // Create a new Lead instance
    const newLead = new Lead({
      customerName,
      email,
      phone,
      contactMethod,
      address,
      serviceRequestDate,
      details,
      location,
      service,
      user: userId,
      partner: existLocation.partnerId,
      uploadedMedia: imageUploadResults.map((image) => image.url),
    });

    // Save the lead to the database

    const newConversation: any = await Conversation.create({
      participants: [userId, existService.user],
      type: "Lead",
      lead: newLead._id,
    });
    newLead.conversationId = newConversation._id;

    const savedLead = await newLead.save();

    // Respond with the saved lead
    res.status(201).json({
      message: "Lead created successfully",
      lead: savedLead,
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      message: "Server error while creating lead",
      error: error.message,
    });
  }
};

// Update lead status, reason, and offer
export const updateLeadStatus = async (req: CustomRequest, res: Response) => {
  try {
    const { leadId } = req.params;
    const { status, reason, offer } = req.body;
    const userId = req.user!._id;

    // Find the lead by ID
    const lead = await Lead.findById(leadId)
      .populate(
        "service",
        "name images priceType price priceRange options description"
      )
      .populate("location", "locationName")
      .populate("user", "avatarUrl");

    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }

    const isPartner = lead.partner.toString() === userId.toString();
    const isUser = lead.user.toString() === userId.toString();

    // Rules based on the current lead status and user roles
    switch (lead.status) {
      case "Pending":
        if (isUser) {
          // User can delete lead (mark as Complete with reason "User Deleted")
          if (status === "Complete" && reason === "User Deleted") {
            lead.status = "Complete";
            lead.reason = reason;
          } else {
            res.status(400).json({ message: "Invalid action for user" });
            return;
          }
        } else if (isPartner) {
          if (status === "Active" && !reason) {
            // Partner can approve the lead (mark as Active)
            lead.status = "Active";
          } else if (status === "Complete" && reason === "Location Declined") {
            // Partner can decline the lead
            lead.status = "Complete";
            lead.reason = "Location Declined";
          } else {
            res.status(400).json({ message: "Invalid action for partner" });
            return;
          }
        }
        break;

      case "Pool":
        if (isUser) {
          // User can approve or decline the lead in Pool status
          if (status === "Active" && !reason && offer) {
            lead.status = "Active";
            lead.offer = offer;
          } else if (status === "Complete" && reason === "User Decline") {
            lead.status = "Complete";
            lead.reason = "User Decline";
          } else {
            res
              .status(400)
              .json({ message: "Invalid action for user in Pool" });
            return;
          }
        } else if (isPartner) {
          if (status === "Complete" && reason === "Location Declined") {
            // Partner can decline the lead in Pool status
            lead.status = "Complete";
            lead.reason = "Location Declined";
          } else {
            res
              .status(400)
              .json({ message: "Invalid action for partner in Pool" });
            return;
          }
        }
        break;

      case "Active":
        if (isUser) {
          res
            .status(400)
            .json({ message: "User cannot update an Active lead" });
          return;
        } else if (isPartner) {
          if (status === "Complete" && reason === "Awaiting Customer Review") {
            // Partner can complete the lead, awaiting customer review
            lead.status = "Complete";
            lead.reason = "Awaiting Customer Review";
            lead.dateCompleted = new Date();
          } else {
            res
              .status(400)
              .json({ message: "Invalid action for partner on Active lead" });
            return;
          }
        }
        break;

      case "Complete":
        res
          .status(400)
          .json({ message: "Lead is already complete and cannot be updated" });
        return;

      default:
        res.status(400).json({ message: "Invalid lead status" });
        return;
    }

    // Save the updated lead
    await lead.save();

    res.status(200).json({ message: "Lead updated successfully", lead });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Add Note to Lead by Partner
export const addNoteToLead = async (req: CustomRequest, res: Response) => {
  const { leadId } = req.params;
  const { note } = req.body;
  const partnerId = req.user?._id;

  try {
    // Find the lead
    const lead = await Lead.findById(leadId);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    // Ensure the partner assigned to this lead is the one making the request
    if (String(lead.partner) !== String(partnerId)) {
      res.status(403).json({
        message: "You are not authorized to add a note to this lead",
      });
      return;
    }

    // Update the note field
    lead.note = note;
    await lead.save();

    res.status(200).json({
      message: "Note added successfully",
      lead,
    });
  } catch (error: any) {
    console.error("Error adding note to lead:", error);
    res.status(500).json({
      message: "Server error while adding note to lead",
      error: error.message,
    });
  }
};

// Controller to get all leads for a partner
export const getPartnerLeads = async (req: CustomRequest, res: Response) => {
  const partnerId = req.user?._id;
  const { status } = req.query;

  try {
    let query: any = { partner: partnerId };

    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .populate("service", "name priceType images price priceRange")
      .populate("location", "locationName");

    res.status(200).json({
      message: "Partner leads fetched successfully",
      leads,
    });
  } catch (error: any) {
    console.error("Error fetching partner leads:", error);
    res.status(500).json({
      message: "Server error while fetching partner leads",
      error: error.message,
    });
  }
};

export const getUserLeads = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  const { status } = req.query;

  try {
    let query: any = { user: userId };

    if (status) {
      query.status = status;
    }
    const leads = await Lead.find(query)
      .populate("service", "name images description rating")
      .populate("location", "locationName");
    res.status(200).json({
      message: "Partner leads fetched successfully",
      leads,
    });
  } catch (error: any) {
    console.error("Error fetching user leads:", error);
    res.status(500).json({
      message: "Server error while fetching partner leads",
      error: error.message,
    });
  }
};

export const getLeadById = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  try {
    const lead = await Lead.findById(id)
      .populate(
        "service",
        "name images priceType price priceRange options description"
      )
      .populate("location", "locationName")
      .populate("user", "avatarUrl");
    res.status(200).json({
      message: "Partner lead fetched successfully",
      lead,
    });
  } catch (error: any) {
    console.error("Error fetching  lead:", error);
    res.status(500).json({
      message: "Server error while fetching  lead",
      error: error.message,
    });
  }
};
