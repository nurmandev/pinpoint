import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "@/src/components/partner/settings/Profile";

const ProfileSetting = () => {
  return (
    <View
      style={{
        backgroundColor: "#f9f9f9",
      }}
    >
      <View style={{ backgroundColor: "#fff", marginTop: 5, padding: 15 }}>
        <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 5 }}>
          Username Last name
        </Text>
        <Text style={{ marginBottom: 10 }}>User nickname</Text>
        <Profile />
      </View>
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({});
