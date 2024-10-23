import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import useDimensions from "@/src/hooks/useDimension";
import Conversions from "@/src/components/message/Conversions";
import Chat from "@/src/components/message/Chat";

const Message = () => {
  const { isMobile } = useDimensions();
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
        <Conversions />
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
