import { getBackendErrorMessage } from "../utils/error";
import axiosInstance from "./api";

export interface LeadData {
  customerName: string;
  email: string;
  phone?: string;
  contactMethod?: "text" | "email" | "call";
  address?: string;
  serviceRequestDate: Date;
  details: string;
  location: string;
  item: string;
  uploadedMedia?: File[];
  note?: string;
}

export interface ReviewData {
  content: string;
  rating: number;
  image?: File | null;
}

export const createLead = async (leadData: LeadData) => {
  try {
    const formData = new FormData();

    formData.append("customerName", leadData.customerName);
    formData.append("email", leadData.email);
    if (leadData.phone) {
      formData.append("phone", leadData.phone);
    }
    if (leadData.contactMethod) {
      formData.append("contactMethod", leadData.contactMethod);
    }
    if (leadData.address) {
      formData.append("address", leadData.address);
    }
    formData.append(
      "serviceRequestDate",
      leadData.serviceRequestDate.toISOString()
    );
    formData.append("details", leadData.details);

    formData.append(`location`, leadData.location);
    formData.append(`item`, leadData.item);

    if (leadData.uploadedMedia) {
      leadData.uploadedMedia.forEach((file) => {
        formData.append("media", file);
      });
    }

    const response = await axiosInstance.post("/leads", formData);
    return response.data.lead;
  } catch (error) {
    console.error("Error creating lead:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const getPartnerLeads = async (status?: string) => {
  try {
    const response = await axiosInstance.get(`/leads/partner?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching partner leads:", error);
    throw error;
  }
};

export const getLeadById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching partner leads:",
      getBackendErrorMessage(error)
    );
    throw getBackendErrorMessage(error);
  }
};

export const getLeadByItem = async (id: string, status?: string) => {
  try {
    const response = await axiosInstance.get(
      `/leads/item/${id}?status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching partner leads:",
      getBackendErrorMessage(error)
    );
    throw getBackendErrorMessage(error);
  }
};

export const getUserLeads = async (status?: string) => {
  try {
    // Construct the URL with an optional status query parameter
    const url = status ? `/leads?status=${status}` : "/leads";

    const response = await axiosInstance.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user leads:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const addNoteToLead = async (leadId: string, note: string) => {
  try {
    const response = await axiosInstance.put(`/leads/${leadId}/note`, { note });
    return response.data;
  } catch (error) {
    console.error(`Error adding note to lead with ID: ${leadId}`, error);
    throw error;
  }
};

export const updateLeadStatus = async (
  leadId: string,
  data: {
    status: string;
    reason?: string;
    time?: string;
    date?: string;
    price?: string;
  }
) => {
  try {
    const response = await axiosInstance.put(`/leads/${leadId}/status`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating lead status:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const submitReview = async (leadId: string, reviewData: ReviewData) => {
  try {
    const formData = new FormData();
    formData.append("content", reviewData.content);
    formData.append("rating", reviewData.rating.toString());
    if (reviewData.image) {
      formData.append("media", reviewData.image);
    }

    const response = await axiosInstance.post(
      `/leads/${leadId}/review`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error submitting review for service with ID: ${leadId}`,
      error
    );
    throw getBackendErrorMessage(error);
  }
};
