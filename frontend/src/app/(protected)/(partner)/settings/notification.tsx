import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Notification from "@/src/components/partner/settings/Notification";

const NotificationSet = () => {
  return (
    <View
      style={{
        backgroundColor: "#f9f9f9",
        flex: 1,
      }}
    >
      <View
        style={{ backgroundColor: "#fff", marginTop: 5, padding: 15, flex: 1 }}
      >
        <Notification />
      </View>
    </View>
  );
};

export default NotificationSet;

const styles = StyleSheet.create({});
