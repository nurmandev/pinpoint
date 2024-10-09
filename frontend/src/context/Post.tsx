// src/context/PostContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  reportPost,
  PostData,
  getPosts,
} from "../services/post";
import { Post } from "../types/post";

interface PostContextProps {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  createNewPost: (data: PostData) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  updateExistingPost: (id: string, data: PostData) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  likeExistingPost: (id: string) => Promise<void>;
  reportExistingPost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const createNewPost = async (data: PostData) => {
    try {
      await createPost(data);
      fetchPosts();
    } catch (error) {
      throw error;
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response);
    } catch (error) {
      throw error;
    }
  };

  const fetchPostById = async (id: string) => {
    try {
      const response = await getPostById(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateExistingPost = async (id: string, data: PostData) => {
    try {
      const response = await updatePost(id, data);
      // Update the posts state (find the post and update it)
      setPosts((prev) =>
        prev.map((post) => (post._id === id ? response : post))
      );
    } catch (error) {
      throw error;
    }
  };

  const removePost = async (id: string) => {
    try {
      await deletePost(id);
      // Remove the post from state
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const likeExistingPost = async (id: string) => {
    try {
      const response = await likePost(id);
      // Update the posts state if needed
      fetchPosts();
    } catch (error) {
      throw error;
    }
  };

  const reportExistingPost = async (id: string) => {
    try {
      const response = await reportPost(id);
      // Handle the reported post (e.g., update state, show message, etc.)
      console.log("Post reported:", response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchPAllosts = async () => {
      try {
        await fetchPosts();
      } catch (error) {
        console.log("fetch posts error", error);
      }
    };
    fetchPAllosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPosts,
        createNewPost,
        fetchPostById,
        updateExistingPost,
        removePost,
        likeExistingPost,
        reportExistingPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Custom hook for using PostContext
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
