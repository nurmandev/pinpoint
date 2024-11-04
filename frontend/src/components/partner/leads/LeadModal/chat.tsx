import ChatFooter from "@/src/components/chat/ChatFooter";
import { Item } from "@/src/components/chat/Item";
import { useMessage } from "@/src/context/Message";
import { useUser } from "@/src/context/User";
import { imageURL } from "@/src/services/api";
import socket from "@/src/socket";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Avatar, Card, useTheme } from "react-native-paper";

interface Props {
  status?: string;
}
const Chat: React.FC<Props> = ({ status }) => {
  const { user } = useUser();
  const { colors } = useTheme();
  const {
    messages,
    isTypingList,
    currentConversation,
    setCurrentConversation,
    sendMessage,
  } = useMessage();
  const [messageInput, setMessageInput] = useState("");
  const [image, setImage] = useState("");
  const [sending, setSending] = useState({
    value: false,
    image: "",
    message: "",
    failed: false,
  });

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  const startTyping = () => {
    socket.emit("typing", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  // Function to emit stopTyping event
  const stopTyping = () => {
    socket.emit("stopTyping", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  const handleMessageSubmit = async () => {
    // Handle sending message logic
    if (!currentConversation) return;
    if (!messageInput && !image) return;
    try {
      setSending({ value: true, image, message: messageInput, failed: false });
      setMessageInput("");
      await sendMessage({
        content: messageInput,
        conversationId: currentConversation._id,
        image,
      });
      setSending({ value: false, image: "", message: "", failed: false });
    } catch (error) {
      console.log(error);
      setSending((prev) => ({ ...prev, value: true, failed: true }));
    }
  };

  const handleRetry = async () => {
    if (!currentConversation) return;
    try {
      setSending((prev) => ({ ...prev, value: true, failed: false }));
      await sendMessage({
        content: sending.message,
        conversationId: currentConversation._id,
        image: sending.image,
      });

      setSending({ value: false, image: "", message: "", failed: false });
    } catch (error) {
      setSending((prev) => ({ ...prev, value: true, failed: true }));
    }
  };
  return (
    <View style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Avatar.Image
            size={30}
            source={{ uri: imageURL + currentConversation?.otherUser?.image }}
          />
          <View>
            <Text style={styles.messageTitle}>
              {currentConversation?.otherUser.username}
            </Text>
            <Text style={styles.textGray}> Active</Text>
          </View>
        </View>
        <Ionicons name="close" size={20} />
      </View>
      <View style={styles.messageBody}>
        {messages.length <= 0 ? (
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.messagePrompt}>
              Send a message to {user?.username}
            </Text>
          </View>
        ) : (
          <FlatList
            data={messages.slice().reverse()}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.chatContainer}
            inverted
            ListHeaderComponent={
              <ChatFooter
                currentConversation={currentConversation}
                handleRetry={handleRetry}
                isTypingList={isTypingList}
                sending={sending}
              />
            }
          />
        )}
        {status !== "Complete" && (
          <View style={styles.inputContainer}>
            <Ionicons name="attach" size={24} color="gray" />
            <View style={styles.inputCont}>
              <TextInput
                style={styles.input}
                placeholder="Message"
                placeholderTextColor={"gray"}
                value={messageInput}
                onChangeText={(text) => {
                  setMessageInput(text);
                  startTyping();
                }}
                onFocus={startTyping}
                onBlur={stopTyping}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleMessageSubmit}
              >
                <Ionicons
                  name="send-outline"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageCard: {
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    height: 400,
    borderRadius: 10,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  messageTitle: {
    flex: 1,
    fontWeight: "bold",
    marginLeft: 5,
  },
  messageBody: { flex: 1, padding: 10 },
  messagePrompt: {
    marginBottom: 5,
    color: "#666",
  },
  chatContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  inputCont: {
    flex: 1,
    borderRadius: 5,
    height: "100%",
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    height: "100%",
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
  textGray: {
    color: "#666",
  },
});

export default Chat;
