import axiosInstance from "./api";

export interface UserData {
  firstName?: string;
  lastName?: string;
  state?: string;
  city?: string;
  image?: File | null;
  notification?: object;
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
      formData.append("firstName", data.firstName);
    }
    if (data.lastName) {
      formData.append("lastName", data.lastName);
    }
    if (data.state) {
      formData.append("state", data.state);
    }
    if (data.city) {
      formData.append("city", data.city);
    }
    if (data.image) {
      formData.append("media", data.image);
    }
    if (data.notification) {
      formData.append("notification", JSON.stringify(data.notification));
    }
    const response = await axiosInstance.put("/users", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccountService = async () => {
  try {
    const response = await axiosInstance.delete("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};
