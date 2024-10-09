import { Response } from "express";
import Location from "../models/location";
import { validationResult } from "express-validator";
import { CustomRequest } from "../middleware/auth";
import { deleteMediaFromS3, uploadMediaToS3 } from "../utils/media";

// Create a new Location
export const createLocation = async (req: CustomRequest, res: Response) => {
  const partnerId = req.user!._id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const {
    locationName,
    address,
    description,
    categories,
    hoursOfOperation,
    menu,
    coordinates,
    poll,
  } = req.body;

  try {
    // Utility function to parse potential JSON fields
    const parseJSONField = (field: any, fieldName: string) => {
      if (typeof field === "string") {
        try {
          const parsedField = JSON.parse(field);
          if (typeof parsedField === "object" || Array.isArray(parsedField)) {
            return parsedField;
          } else {
            throw new Error();
          }
        } catch (error) {
          throw new Error(
            `Invalid format for ${fieldName}. Expected a valid JSON object or array.`
          );
        }
      }
      return field;
    };

    // Parse any fields that might be JSON stringified
    const parsedHoursOfOperation = parseJSONField(
      hoursOfOperation,
      "hoursOfOperation"
    );
    const parsedMenu = parseJSONField(menu, "menu");
    const parsedCoordinates = parseJSONField(coordinates, "coordinates");
    const parsedPoll = parseJSONField(poll, "poll");

    // Handle media files
    const mediaUploadPromises: Promise<any>[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        mediaUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const mediaUploadResults = await Promise.all(mediaUploadPromises);
    console.log(mediaUploadResults);
    const location = new Location({
      partnerId,
      images: mediaUploadResults.map((image) => image.url),
      locationName,
      address,
      description,
      categories,
      hoursOfOperation: parsedHoursOfOperation,
      menu: parsedMenu,
      coordinates: parsedCoordinates,
      poll: parsedPoll,
    });
    await location.save();
    res
      .status(201)
      .json({ message: "Location created successfully", location });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all Locations
export const getUserAllLocations = async (
  req: CustomRequest,
  res: Response
) => {
  const partnerId = req.user!._id;
  try {
    const locations = await Location.find({ partnerId });
    res.status(200).json(locations);
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single Location by ID
export const getLocationById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    const location = await Location.findById(id);
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update a Location
export const updateLocation = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const {
    locationName,
    address,
    description,
    categories,
    hoursOfOperation,
    menu,
    coordinates,
    poll,
  } = req.body;

  try {
    const location = await Location.findById(id);
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    // Check if the user is the owner of the location
    if (location.partnerId.toString() !== req.user!._id.toString()) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this location" });
      return;
    }

    // Update the location fields
    location.locationName = locationName || location.locationName;
    location.address = address || location.address;
    location.description = description || location.description;
    location.categories = categories || location.categories;
    location.hoursOfOperation = hoursOfOperation || location.hoursOfOperation;
    location.menu = menu || location.menu;
    location.coordinates = coordinates || location.coordinates;
    location.poll = poll || location.poll;

    await location.save();
    res
      .status(200)
      .json({ message: "Location updated successfully", location });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteLocation = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    const location = await Location.findById(id);
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    // Check if the user is the owner of the location
    if (location.partnerId.toString() !== req.user!._id.toString()) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this location" });
      return;
    }

    if (location.images && location.images.length > 0) {
      await Promise.all(
        location.images.map(async (media) => {
          await deleteMediaFromS3(media); // Function to delete the file from S3
        })
      );
    }

    await location.deleteOne();
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
