import axiosInstance from "./api";
import * as ImageManipulator from "expo-image-manipulator";

export interface PostData {
  content: string;
  media?: { url: string; name: string; type?: string }[];
  location?: string;
}

export const createPost = async (data: PostData) => {
  try {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.location) {
      formData.append("location", data.location);
    }

    if (data.media && data.media.length > 0) {
      for (const mediaItem of data.media) {
        // Compress and resize media before appending
        const processedUri = await ImageManipulator.manipulateAsync(
          mediaItem.url,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        formData.append("media", {
          uri: processedUri.uri,
          name: mediaItem.name,
          type: mediaItem.type || "image/jpeg",
        } as any);
      }
    }

    const response = await axiosInstance.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating post:", error);
    const message = error?.response?.data?.message || "Error creating post";
    throw new Error(message);
  }
};

// Get all post
export const getPosts = async () => {
  try {
    const response = await axiosInstance.get(`/posts`);
    return response.data;
  } catch (error: any) {
    console.log("get all posts error", error);
    throw new Error(error?.response?.data?.message || "Error fetching post");
  }
};

// Get a post by ID
export const getPostById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error fetching post");
  }
};

// Update a post (Only owner can update)
export const updatePost = async (id: string, data: PostData) => {
  const formData = new FormData();
  formData.append("content", data.content);

  if (data.media) {
    for (let i = 0; i < data.media.length; i++) {
      formData.append("media", data.media[i].url);
    }
  }

  try {
    const response = await axiosInstance.put(`/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error updating post");
  }
};

// Delete a post (Only owner can delete)
export const deletePost = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error deleting post");
  }
};

// Like a post (Any authenticated user)
export const likePost = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/posts/${id}/like`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error liking post");
  }
};

// Report a post (Any authenticated user)
export const reportPost = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/${id}/report`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error reporting post");
  }
};
