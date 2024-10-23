import axiosInstance from "./api";

export interface UserData {
  firstName?: string;
  lastName?: string;
  state?: string;
  city?: string;
  image?: File | null;
}

export const getUserService = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (data: UserData) => {
  try {
    const formData = new FormData();

    if (data.firstName) {
      formData.append("media", data.firstName);
    }
    if (data.lastName) {
      formData.append("media", data.lastName);
    }
    if (data.state) {
      formData.append("media", data.state);
    }
    if (data.city) {
      formData.append("media", data.city);
    }
    if (data.image) {
      formData.append("media", data.image);
    }
    const response = await axiosInstance.put("/users", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
