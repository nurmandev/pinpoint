import {
  IConversation,
  IMessage,
  MessageData,
  ConversationData,
} from "../types/message";
import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export const sendMessageService = async (
  messageData: MessageData
): Promise<IMessage> => {
  try {
    const res = await api.post(`/messages/send`, messageData);
    return res.data.message;
  } catch (error) {
    console.log("Error sending message:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const getMessagesService = async (
  conversationId: string
): Promise<IMessage[]> => {
  try {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data.messages;
  } catch (error) {
    console.log("Error getting message:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const getConversationsService = async (
  type: string
): Promise<IConversation[]> => {
  try {
    const response = await api.get(`/messages/conversations/${type}`);
    return response.data.conversations;
  } catch (error) {
    console.log("Error fetching conversation:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const getConversationService = async (
  id: string
): Promise<IConversation> => {
  try {
    const response = await api.get(`/messages/conversation/${id}`);
    return response.data.conversation;
  } catch (error) {
    console.log("Error fetching conversation:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const startConversationService = async (
  conversationData: ConversationData
): Promise<IConversation> => {
  try {
    const res = await api.post(`/messages/conversation`, conversationData);
    return res.data.conversation;
  } catch (error) {
    console.log("Error starting conversation:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};
