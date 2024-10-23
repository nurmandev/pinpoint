import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { IConversation, IMessage, MessageData } from "../types/message";
import {
  getConversationsService,
  getMessagesService,
  sendMessageService,
} from "../services/message";
import socket from "../socket";
import { useUser } from "./User";

interface Props {
  children?: ReactNode;
}

interface MessageContextType {
  loading: boolean;
  loadingMessage: boolean;
  isTypingList: { value: boolean; id: string }[];
  error: string;
  messages: IMessage[];
  conversations: IConversation[];
  currentConversation: IConversation | null;
  isAnimating: boolean;
  setIsAnimating: (conversation: boolean) => void;
  setCurrentConversation: (conversation: IConversation | null) => void;
  sendMessage: (message: MessageData) => Promise<void>;
  getMessages: (receiver: string) => Promise<void>;
  getConversations: (type: string) => Promise<IConversation[]>;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

const MessageProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
  const [currentConversation, setCurrentConversation] =
    useState<IConversation | null>(null);
  const [isTypingList, setIsTypingList] = useState<
    { value: boolean; id: string }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (currentConversation) {
        await getMessages(currentConversation._id);
      } else {
        setMessages([]);
      }
    };
    fetchData();
  }, [currentConversation]);

  useEffect(() => {
    const handleTyping = ({
      conversationId,
      isTyping,
    }: {
      conversationId: string;
      isTyping: boolean;
    }) => {
      clearTimeout(typingTimeout);
      if (isTyping) {
        setIsTypingList((prev) => [
          ...prev,
          { value: isTyping, id: conversationId },
        ]);
        typingTimeout = setTimeout(() => {
          setIsTypingList((prev) =>
            prev.filter((type) => type.id !== conversationId)
          );
        }, 3000);
      } else {
        setIsTypingList((prev) =>
          prev.filter((type) => type.id !== conversationId)
        );
        clearTimeout(typingTimeout);
      }
    };

    let typingTimeout: NodeJS.Timeout;

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (message: IMessage) => {
      if (message.conversationId === currentConversation?._id) {
        setIsTypingList((prev) =>
          prev.filter((type) => type.id !== message.conversationId)
        );
        if (!messages.find((msg) => msg._id === message._id)) {
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
          setMessages((prevMessages) => [...prevMessages, message]);
          markMessagesAsRead(currentConversation._id, user!._id);
        }
      } else {
        reloadConversation();
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [currentConversation, messages, user]);

  useEffect(() => {
    socket.on("messagesRead", () => {
      reloadConversation();
    });

    return () => {
      socket.off("messagesRead");
    };
  }, []);

  const markMessagesAsRead = (conversationId: string, userId: string) => {
    socket.emit("markAsRead", { conversationId, userId });
  };

  const sendMessage = async (message: MessageData) => {
    try {
      const res = await sendMessageService(message);
      setMessages((prevMessages) => [...prevMessages, res]);
      reloadConversation();
    } catch (error) {
      throw error;
    }
  };

  const getMessages = async (receiver: string) => {
    try {
      setLoadingMessage(true);
      const receivedMessages = await getMessagesService(receiver);
      setMessages(receivedMessages);
      setLoadingMessage(false);
    } catch (error) {
      setLoadingMessage(false);
    }
  };

  const getConversations = async (type: string) => {
    try {
      setLoading(true);
      const res = await getConversationsService(type);
      setConversations(res);
      setLoading(false);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const reloadConversation = async () => {
    const res = await getConversationsService("Chat");
    console.log("res", res);
    setConversations(res);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        conversations,
        error,
        loading,
        currentConversation,
        isTypingList,
        loadingMessage,
        isAnimating,
        setIsAnimating,
        setCurrentConversation,
        sendMessage,
        getMessages,
        getConversations,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a CartProvider");
  }
  return context;
};
