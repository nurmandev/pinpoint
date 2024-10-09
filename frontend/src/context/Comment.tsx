// src/context/CommentContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  createComment,
  getPostComments,
  replyToComment,
} from "../services/comment";
import { Comment } from "../types/comment";

interface CommentContextProps {
  comments: Comment[];
  sendComment: (id: string, content: string) => Promise<void>;
  sendReply: (id: string, content: string) => Promise<void>;
  fetchComments: (id: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextProps | undefined>(
  undefined
);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (id: string) => {
    try {
      const res = await getPostComments(id);
      setComments(res);
    } catch (error: any) {
      throw error.message;
    }
  };

  const sendComment = async (id: string, content: string) => {
    if (!content || id) return;
    try {
      const res = await createComment(id, content);
      setComments([...comments, { ...res, replies: [] }]);
    } catch (error: any) {
      throw error.message;
    }
  };

  const sendReply = async (id: string, content: string) => {
    if (!content) return;
    try {
      const res = await replyToComment(id, content);
      setComments((prev) => {
        const index = prev.findIndex((comment) => comment._id === id);
        if (index !== -1) {
          prev[index].replies.push({ ...res, replies: [] });
          return prev;
        }
        return prev;
      });
    } catch (error: any) {
      throw error.message;
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        fetchComments,
        sendComment,
        sendReply,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

// Custom hook for using CommentContext
export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};
