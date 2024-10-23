import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  submitReview,
  ServiceData,
  ReviewData,
  GetServiceData,
} from "../services/service"; // import your services
import { IService } from "../types/service";

interface ServiceContextProps {
  services: IService[];
  getService: (id: string) => Promise<IService>;
  createNewService: (serviceData: ServiceData) => Promise<IService>;
  updateExistingService: (
    id: string,
    serviceData: ServiceData
  ) => Promise<IService>;
  removeService: (id: string) => Promise<void>;
  reviewService: (id: string, reviewData: ReviewData) => Promise<any>;
  fetchServices: (props: GetServiceData) => Promise<IService[]>;
}

const ServiceContext = createContext<ServiceContextProps | undefined>(
  undefined
);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServives] = useState<IService[]>([]);

  const fetchServices = async (props: GetServiceData) => {
    try {
      const fetchedServives = await getAllServices(props);
      setServives(fetchedServives);
      return fetchedServives;
    } catch (error) {
      console.error("Error fetching services", error);
      throw error;
    }
  };

  const getService = async (id: string) => {
    try {
      const service = await getServiceById(id);
      return service;
    } catch (error) {
      console.error(`Error fetching service with ID ${id}`, error);
      throw error;
    }
  };

  // Create a new service
  const createNewService = async (serviceData: ServiceData) => {
    try {
      const createdService = await createService(serviceData);
      console.log(createdService);
      setServives((prev) => [...prev, createdService]);
      return createdService;
    } catch (error) {
      console.error("Error creating service", error);
      throw error;
    }
  };

  // Update an existing service
  const updateExistingService = async (
    id: string,
    serviceData: ServiceData
  ) => {
    try {
      const updatedService = await updateService(id, serviceData);
      setServives(
        services.map((service) =>
          service._id === id ? updatedService : service
        )
      );
      return updatedService;
    } catch (error) {
      console.error(`Error updating service with ID ${id}`, error);
      throw error;
    }
  };

  // Delete a service
  const removeService = async (id: string) => {
    try {
      await deleteService(id);
      setServives(services.filter((service) => service._id !== id));
    } catch (error) {
      console.error(`Error deleting service with ID ${id}`, error);
      throw error;
    }
  };

  // Submit a review for a service
  const reviewService = async (id: string, reviewData: ReviewData) => {
    try {
      const response = await submitReview(id, reviewData);
      return response;
    } catch (error) {
      console.error(`Error submitting review for service with ID ${id}`, error);
      throw error;
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        getService,
        createNewService,
        updateExistingService,
        removeService,
        reviewService,
        fetchServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to use the ServiceContext
export const useService = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};
