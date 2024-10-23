import { IService } from "../types/service";
import { getBackendErrorMessage } from "../utils/error";
import axiosInstance from "./api";

export interface ServiceData {
  name: string;
  description: string;
  priceType: "flat" | "range";
  priceRange: { from: number; to: number } | null;
  price: number | null;
  duration: number;
  images: { url: string; name: string }[];
  existingImages?: string[];
  location: string[];
  mainCategory: string[];
  category: string[];
  subCategory: string[];
  options: {
    optionCategory: string;
    optionName: string;
  }[];
  homeService: boolean;
  serviceRadius?: string;
}

export interface GetServiceData {
  page?: number;
  limit?: number;
  search?: string;
  category?: string[];
  subCategory?: string[];
  minPrice?: number;
  maxPrice?: number;
  inShopOnly?: boolean;
  availableOnline?: boolean;
  options?: { [key: string]: string };
}

export interface ReviewData {
  content: string;
  rating: number;
  image?: File;
}

export const getAllServices = async ({
  page = 1,
  limit = 10,
  search = "",
  category = [],
  subCategory = [],
  minPrice,
  maxPrice,
  inShopOnly,
  availableOnline,
  options,
}: GetServiceData): Promise<IService[]> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
      ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
      ...(inShopOnly !== undefined && { inShopOnly: inShopOnly.toString() }),
      ...(availableOnline !== undefined && {
        availableOnline: availableOnline.toString(),
      }),
      ...(options && { options: JSON.stringify(options) }),
    });

    // Handle category and subCategory arrays
    if (category.length > 0) {
      category.forEach((cat) => queryParams.append("category", cat));
    }
    if (subCategory.length > 0) {
      subCategory.forEach((sub) => queryParams.append("subCategory", sub));
    }

    const response = await axiosInstance.get(
      `/services?${queryParams.toString()}`
    );
    return response.data.services;
  } catch (error) {
    console.error("Error fetching services with filters:", error);
    throw error;
  }
};

export const fetchServicesForLocation = async (locationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/services/location/${locationId}`
    );
    return response.data.services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getServiceById = async (serviceId: string) => {
  try {
    const response = await axiosInstance.get(`/services/${serviceId}`);
    return response.data.service;
  } catch (error) {
    console.error(`Error fetching service with ID: ${serviceId}`, error);
    throw error;
  }
};

export const createService = async (serviceData: ServiceData) => {
  try {
    const formData = new FormData();

    formData.append("name", serviceData.name);
    formData.append("description", serviceData.description);
    formData.append("duration", serviceData.duration.toString());
    formData.append("priceType", serviceData.priceType.toString());
    formData.append("homeService", serviceData.homeService.toString());
    if (serviceData.price) {
      formData.append("price", serviceData.price.toString());
    }

    if (serviceData.priceRange) {
      formData.append("priceRange", JSON.stringify(serviceData.priceRange));
    }

    if (serviceData.serviceRadius) {
      formData.append("serviceRadius", serviceData.serviceRadius);
    }

    serviceData.images.forEach((image) => {
      console.log(image);
      //@ts-ignore
      formData.append("media", {
        uri: image.url,
        name: image.name,
      });
    });

    // Append array fields
    serviceData.location.forEach((loc, index) => {
      formData.append(`location[${index}]`, loc);
    });

    serviceData.mainCategory.forEach((cat, index) => {
      formData.append(`mainCategory[${index}]`, cat);
    });

    serviceData.category.forEach((cat, index) => {
      formData.append(`category[${index}]`, cat);
    });

    if (serviceData.subCategory) {
      serviceData.subCategory.forEach((subCat, index) => {
        formData.append(`subCategory[${index}]`, subCat);
      });
    }

    // Append service options
    if (serviceData.options) {
      serviceData.options.forEach((option, index) => {
        formData.append(
          `options[${index}][optionCategory]`,
          option.optionCategory
        );
        formData.append(`options[${index}][optionName]`, option.optionName);
      });
    }
    const response = await axiosInstance.post(`/services`, formData);
    return response.data.service;
  } catch (error) {
    console.error("Error creating service:", getBackendErrorMessage(error));
    throw error;
  }
};

// Function to update an existing service
export const updateService = async (
  serviceId: string,
  serviceData: ServiceData
) => {
  try {
    const formData = new FormData();

    formData.append("name", serviceData.name);
    formData.append("description", serviceData.description);
    formData.append("duration", serviceData.duration.toString());
    formData.append("priceType", serviceData.priceType.toString());
    formData.append("homeService", serviceData.homeService.toString());
    if (serviceData.price) {
      formData.append("price", serviceData.price.toString());
    }

    if (serviceData.priceRange) {
      formData.append("priceRange", serviceData.priceRange.toString());
    }

    if (serviceData.serviceRadius) {
      formData.append("serviceRadius", serviceData.serviceRadius);
    }

    serviceData.images.forEach((image) => {
      console.log(image);
      //@ts-ignore
      formData.append("media", {
        uri: image.url,
        name: image.name,
      });
    });

    // Append array fields
    serviceData.location.forEach((loc, index) => {
      formData.append(`location[${index}]`, loc);
    });

    serviceData.mainCategory.forEach((cat, index) => {
      formData.append(`mainCategory[${index}]`, cat);
    });

    serviceData.category.forEach((cat, index) => {
      formData.append(`category[${index}]`, cat);
    });

    if (serviceData.subCategory) {
      serviceData.subCategory.forEach((subCat, index) => {
        formData.append(`subCategory[${index}]`, subCat);
      });
    }

    serviceData.existingImages &&
      serviceData.existingImages.forEach((loc, index) => {
        formData.append(`existingImages[${index}]`, loc);
      });

    // Append service options
    if (serviceData.options) {
      serviceData.options.forEach((option, index) => {
        formData.append(
          `options[${index}][optionCategory]`,
          option.optionCategory
        );
        formData.append(`options[${index}][optionName]`, option.optionName);
      });
    }

    const response = await axiosInstance.put(
      `/services/${serviceId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating service with ID: ${serviceId}`, error);
    throw error;
  }
};

// Function to delete a service by ID
export const deleteService = async (serviceId: string) => {
  try {
    const response = await axiosInstance.delete(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID: ${serviceId}`, error);
    throw error;
  }
};

// Function to submit a service review
export const submitReview = async (
  serviceId: string,
  reviewData: ReviewData
) => {
  try {
    const response = await axiosInstance.post(
      `/services/${serviceId}/review`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error submitting review for service with ID: ${serviceId}`,
      error
    );
    throw getBackendErrorMessage(error);
  }
};
