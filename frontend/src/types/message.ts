export interface MessageData {
  content: string;
  conversationId: string;
  referencedUser?: string;
  referencedProduct?: string;
  image?: string;
}

export interface IMessage {
  offer: any;
  sender: string;
  _id: string;
  receiver: string;
  content: string;
  conversationId: string;
  read: boolean;
  createdAt: string;
}

export interface ConversationData {
  participantId: string;
  type: string;
}

export interface IConversation {
  _id: string;
  participants: string[];
  type: string;
  createdAt: string;
  lastMessage: {
    content: string;
    createdAt: string;
    sender: string;
    receiver: string;
  };
  unreadCount: number;
  otherUser: {
    username: string;
    image: string;
  };
}
