import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useDimensions from "@/src/hooks/useDimension";
import Conversions from "@/src/components/message/Conversions";
import Chat from "@/src/components/message/Chat";
import { router } from "expo-router";

const Message = () => {
  const { isMobile } = useDimensions();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null); // State for selected conversation on web

  const handlePress = (messageId: string) => {
    if (!isMobile) {
      // On web and wide screens, set the selected conversation to render side by side
      setSelectedConversation(messageId);
    } else {
      // On mobile, navigate to the new screen
      router.push(`/dashboard/chat/${messageId}`);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: !isMobile ? "row" : "column",
        backgroundColor: "#f5f5f5",
        paddingVertical: Platform.OS === "web" ? 15 : 5,
      }}
    >
      <View style={{ flex: 1 }}>
        <Conversions handlePress={handlePress} />
      </View>
      {!isMobile && (
        <View style={{ flex: 2 }}>
          <Chat />
        </View>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
