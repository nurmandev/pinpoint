import axiosInstance from "./api";

// Interface for the Post data
export interface PostData {
  content: string;
  media?: { url: string; name: string }[];
  location?: string;
}

// Create a new post (Only partners)
export const createPost = async (data: PostData) => {
  const formData = new FormData();
  formData.append("content", data.content);
  if (data?.location) {
    formData.append("location", data?.location);
  }

  if (data.media) {
    for (let i = 0; i < data.media.length; i++) {
      //@ts-ignore
      formData.append("media", {
        uri: data.media[i].url,
        name: data.media[i].name,
      });
    }
  }

  try {
    const response = await axiosInstance.post("/posts", formData);
    return response.data;
  } catch (error: any) {
    // Handle error here
    console.log(error);
    throw new Error(error?.response?.data?.message || "Error creating post");
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
