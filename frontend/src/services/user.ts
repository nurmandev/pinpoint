import axiosInstance from "./api";

export const getUserService = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};
