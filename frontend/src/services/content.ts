import axiosInstance from "./api";

export const fetchContentsByLocation = async (locationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/contents/location/${locationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching content for location:", error);
    throw error;
  }
};

export const fetchContentsByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/contents/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching content for location:", error);
    throw error;
  }
};

export const likeContent = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/contents/${id}/like`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error liking post");
  }
};
