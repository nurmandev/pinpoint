import axiosInstance from "./api";

export interface StoryData {
  location?: string;
  content: string;
  media: string[];
  mediaType: "image" | "video";
}

// Create a new story
export const createStory = async (storyData: StoryData) => {
  try {
    const formData = new FormData();
    console.log(storyData);
    // Append all the location data fields
    if (storyData.location) {
      formData.append("location", storyData.location);
    }
    formData.append("content", storyData.content);
    formData.append("mediaType", storyData.mediaType);
    storyData.media.forEach((image, index) => {
      //@ts-ignore
      formData.append("media", {
        uri: image,
        name:
          storyData.mediaType === "image"
            ? `image_${index}.jpg`
            : `video_${index}.mp4`,
      });
    });
    const response = await axiosInstance.post(`/stories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating story:", error);
    throw error;
  }
};

export const getAllStoriesGroupedByUser = async () => {
  try {
    const response = await axiosInstance.get(`/stories`);
    return response.data;
  } catch (error) {
    console.log("Error fetching stories:", error);
    throw error;
  }
};

export const likeStoryService = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/stories/${id}/like`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error like stories:", error);
    throw error;
  }
};

export const unlikeStoryService = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/stories/${id}/unlike`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error unlike stories:", error);
    throw error;
  }
};

export const viewStoryService = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/stories/${id}/view`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error viewing stories:", error);
  }
};
