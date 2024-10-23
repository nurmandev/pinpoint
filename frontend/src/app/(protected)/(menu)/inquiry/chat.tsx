import Button from "@/src/components/Button";
import ChatFooter from "@/src/components/chat/ChatFooter";
import { Item } from "@/src/components/chat/Item";
import Close from "@/src/components/menu/inquiry/Close";
import Decline from "@/src/components/menu/inquiry/Decline";
import { useMessage } from "@/src/context/Message";
import { useUser } from "@/src/context/User";
import { imageURL } from "@/src/services/api";
import socket from "@/src/socket";
import { IMessage } from "@/src/types/message";
import { lightColors } from "@/src/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Appbar, useTheme } from "react-native-paper";

const Chat = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const {
    messages,
    isTypingList,
    currentConversation,
    sendMessage,
    setCurrentConversation,
  } = useMessage();
  const [messageInput, setMessageInput] = useState("");
  const [image, setImage] = useState("");
  const [sending, setSending] = useState({
    value: false,
    image: "",
    message: "",
    failed: false,
  });

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

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={currentConversation?.otherUser.username} />

        <Image
          source={{ uri: imageURL + currentConversation?.otherUser.image }}
          style={styles.userAvatar}
        />
      </Appbar.Header>
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

      <View style={styles.inputContainer}>
        <View style={styles.inputCont}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor={"gray"}
            value={messageInput}
            onChangeText={(text) => {
              setMessageInput(text);
              startTyping();
            }}
            onFocus={startTyping}
            onBlur={stopTyping}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="attach" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleMessageSubmit}
          >
            <Ionicons name="send" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Close />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: "60%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#d8d8d8",
    borderTopLeftRadius: 10,
  },
  otherMessage: {
    backgroundColor: lightColors.colors.primary,
    borderTopRightRadius: 10,
    color: "white",
  },
  messageText: {
    color: "#fff",
  },
  timeText: {
    marginTop: 5,
    marginBottom: 10,
  },
  offerContainer: {
    alignSelf: "flex-start",
    maxWidth: "60%",
    // borderRadius: 20,
    // backgroundColor: lightColors.colors.primary,
    // padding: 10,
    marginVertical: 5,
  },
  offerText: {
    // color: "#fff",
    // fontWeight: "bold"
    fontSize: 18,
  },
  offerDetails: {
    color: "#fff",
    marginVertical: 5,
  },
  offerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
    flex: 1,
    marginRight: 5,
  },
  approveButton: {
    borderColor: lightColors.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    marginLeft: 5,
  },
  declineButtonText: {
    textAlign: "center",
  },
  approveButtonText: {
    color: lightColors.colors.primary,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginBottom: 30,
  },
  inputCont: {
    flex: 1,
    borderRadius: 20,
    height: "100%",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 8,
  },
  offerContentContainer: {
    // maxWidth: "60%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: lightColors.colors.primary,
    borderTopRightRadius: 10,
  },
});

export default Chat;
