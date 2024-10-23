import { getBackendErrorMessage } from "../utils/error";
import axiosInstance from "./api";

export interface LeadData {
  customerName: string;
  email: string;
  phone: string;
  contactMethod: "text" | "email" | "call";
  address: string;
  serviceRequestDate: Date;
  details: string;
  location: string;
  service: string;
  uploadedMedia?: File[];
  note?: string;
}

export const createLead = async (leadData: LeadData) => {
  try {
    const formData = new FormData();

    formData.append("customerName", leadData.customerName);
    formData.append("email", leadData.email);
    formData.append("phone", leadData.phone);
    formData.append("contactMethod", leadData.contactMethod);
    formData.append("address", leadData.address);
    formData.append(
      "serviceRequestDate",
      leadData.serviceRequestDate.toISOString()
    );
    formData.append("details", leadData.details);

    formData.append(`location`, leadData.location);
    formData.append(`service`, leadData.service);

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

export const getUserLeads = async (status?: string) => {
  try {
    // Construct the URL with an optional status query parameter
    const url = status ? `/leads?status=${status}` : "/leads";

    const response = await axiosInstance.get(url);
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
  data: { status: string; reason?: string; offer?: string }
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
