import Button from "@/src/components/Button";
import Close from "@/src/components/menu/inquiry/Close";
import Decline from "@/src/components/menu/inquiry/Decline";
import { lightColors } from "@/src/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
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

const messages = [
  { id: "1", text: "Lorem", sender: "user", time: "Today, 09:00 AM" },
  {
    id: "2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    sender: "user",
    time: "Today, 09:00 AM",
  },
  { id: "3", text: "Lorem", sender: "other", time: "Today, 09:01 AM" },
  {
    id: "4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    sender: "other",
    time: "Today, 09:01 AM",
  },
  {
    id: "5",
    text: "Partner Sent an Offer:",
    offer: { price: "$1500.99", serviceName: "Service name" },
    time: "Today, 09:00 AM",
  },
];

const Chat = () => {
  const { colors } = useTheme();
  const renderItem = ({ item }: any) => {
    if (item.offer) {
      return (
        <View style={styles.offerContainer}>
          <Text style={styles.offerText}>{item.text}</Text>
          <View style={styles.offerContentContainer}>
            <Text style={styles.offerDetails}>
              Price for service: {item.offer.price}
            </Text>
            <Text style={styles.offerDetails}>
              Service name: {item.offer.serviceName}
            </Text>
          </View>
          <View style={styles.offerButtons}>
            <Decline />
            <TouchableOpacity style={styles.approveButton}>
              <Text style={styles.approveButtonText}>Approve</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          alignItems: item.sender === "user" ? "flex-start" : "flex-end",
        }}
      >
        <View
          style={[
            styles.messageContainer,
            item.sender === "user" ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.sender !== "user" && { color: "black" },
            ]}
          >
            {item.text}
          </Text>
        </View>
        <Text
          style={[
            styles.timeText,
            { textAlign: item.sender === "user" ? "left" : "right" },
          ]}
        >
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="James" />

        <Image
          source={require("../../../../../assets/images/slide1.png")}
          style={styles.userAvatar}
        />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputCont}>
          <TextInput
            style={styles.input}
            placeholder="Add your comment..."
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="attach" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
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
    backgroundColor: lightColors.colors.primary,
    borderTopRightRadius: 10,
  },
  otherMessage: {
    backgroundColor: "#e5e5ea",
    borderTopLeftRadius: 10,
  },
  messageText: {
    color: "#fff",
  },
  timeText: {
    marginTop: 5,
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
