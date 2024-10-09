import axiosInstance from "./api";

export interface LocationData {
  locationName: string;
  address: string;
  images: string[];
  description: string;
  categories: string[];
  hoursOfOperation: {
    day: string;
    open: string;
    close: string;
  }[];
  menu: {
    category: string;
    items: string[];
  }[];
  poll?: {
    question: string;
    options: string[];
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Create a new location
export const createLocation = async (locationData: LocationData) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();

    // Append all the location data fields
    formData.append("locationName", locationData.locationName);
    formData.append("address", locationData.address);
    locationData.images.forEach((image, index) => {
      console.log(image);
      //@ts-ignore
      formData.append("media", {
        uri: image,
        name: `image_${index}.jpg`,
        type: "image/jpeg",
      });
    });
    formData.append("description", locationData.description);
    formData.append("categories", JSON.stringify(locationData.categories)); // Convert array to JSON
    formData.append(
      "hoursOfOperation",
      JSON.stringify(locationData.hoursOfOperation)
    ); // Convert array to JSON
    formData.append("menu", JSON.stringify(locationData.menu)); // Convert array to JSON

    // Append poll data if it exists
    if (locationData.poll) {
      formData.append("poll", JSON.stringify(locationData.poll)); // Convert to JSON
    }

    // Append coordinates if they exist
    if (locationData.coordinates) {
      formData.append("coordinates", JSON.stringify(locationData.coordinates)); // Convert to JSON
    }

    // Send the FormData to the server
    const response = await axiosInstance.post(`/locations`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file upload
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

// Get all locations for the user
export const getUserAllLocations = async () => {
  try {
    const response = await axiosInstance.get("/locations/user");
    return response.data;
  } catch (error) {
    console.error("Error getting user locations:", error);
    throw error;
  }
};

// Get a location by ID
export const getLocationById = async (locationId: string) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting location by ID:", error);
    throw error;
  }
};

// Update a location by ID
export const updateLocation = async (
  locationId: string,
  locationData: LocationData
) => {
  try {
    const response = await axiosInstance.put(
      `/locations/${locationId}`,
      locationData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

// Delete a location by ID
export const deleteLocation = async (locationId: string) => {
  try {
    const response = await axiosInstance.delete(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting location:", error);
    throw error;
  }
};
