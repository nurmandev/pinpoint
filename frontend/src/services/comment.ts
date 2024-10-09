import axiosInstance from "./api";

// Create a comment on a post
export const createComment = async (postId: string, content: string) => {
  try {
    const response = await axiosInstance.post("/comments", {
      postId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Get all comments for a post
export const getPostComments = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/comments/${postId}`);
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching post comments:", error);
    throw error;
  }
};

// Like a comment
export const likeComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.put(`/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
};

// Unlike a comment
export const unlikeComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.put(`/comments/${commentId}/unlike`);
    return response.data;
  } catch (error) {
    console.error("Error unliking comment:", error);
    throw error;
  }
};

// Reply to a comment
export const replyToComment = async (commentId: string, content: string) => {
  try {
    const response = await axiosInstance.post(`/comments/${commentId}/reply`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error replying to comment:", error);
    throw error;
  }
};
