import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  createLead,
  getPartnerLeads,
  getLeadById,
  getUserLeads,
  addNoteToLead,
  updateLeadStatus,
  LeadData,
} from "../services/lead";
import { Lead } from "../types/lead";

// Define the shape of the context state
interface LeadContextState {
  leads: any[];
  loading: boolean;
  createNewLead: (leadData: LeadData) => Promise<void>;
  fetchPartnerLeads: (status?: string) => Promise<Lead[]>;
  fetchUserLeads: (status?: string) => Promise<void>;
  fetchLeadById: (id: string) => Promise<Lead>;
  addLeadNote: (leadId: string, note: string) => Promise<Lead>;
  updateStatus: (
    leadId: string,
    data: {
      status: string;
      reason?: string;
      time?: string;
      date?: string;
      price?: string;
    }
  ) => Promise<Lead>;
}

// Create the context with an initial default value
const LeadContext = createContext<LeadContextState | undefined>(undefined);

// Provider component
export const LeadProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const createNewLead = async (leadData: LeadData) => {
    try {
      const newLead = await createLead(leadData);
      setLeads((prevLeads) => [newLead, ...prevLeads]);
    } catch (err) {
      throw err;
    }
  };

  const fetchPartnerLeads = async (status?: string) => {
    try {
      setLoading(true);
      const fetchedLeads = await getPartnerLeads(status);
      setLeads(fetchedLeads.leads);
      return fetchedLeads.leads;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLeads = async (status?: string) => {
    try {
      setLoading(true);
      const fetchedLeads = await getUserLeads(status);
      setLeads(fetchedLeads.leads);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadById = async (id: string) => {
    try {
      const lead = await getLeadById(id);
      return lead.lead;
    } catch (err) {
      throw err;
    }
  };

  const addLeadNote = async (leadId: string, note: string) => {
    try {
      const updatedLead = await addNoteToLead(leadId, note);
      return updatedLead.lead;
    } catch (err) {
      throw err;
    }
  };

  const updateStatus = async (
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
      const updatedLead = await updateLeadStatus(leadId, data);
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead._id === leadId ? updatedLead.lead : lead))
      );
      console.log(updatedLead);
      return updatedLead.lead;
    } catch (err) {
      throw err;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        createNewLead,
        fetchPartnerLeads,
        fetchUserLeads,
        fetchLeadById,
        addLeadNote,
        updateStatus,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

// Custom hook to use the Lead context
export const useLead = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
};
