import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import Profile from "@/src/components/partner/settings/Profile";
import Notification from "@/src/components/partner/settings/Notification";

const Settings = () => {
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("Edit Profile");
  return (
    <View style={styles.container}>
      <Text style={styles.breadcrum}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Dashboard
        </Text>
        / Settings
      </Text>
      <View style={styles.headerCont}>
        <Text style={styles.heading}> Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.tabs}>
          {["Edit Profile", "Notification Settings"].map((item) => (
            <Text
              key={item}
              style={[
                styles.tabText,
                currentTab === item && {
                  color: colors.primary,
                  borderBottomColor: colors.primary,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setCurrentTab(item)}
            >
              {item}
            </Text>
          ))}
        </View>
        {currentTab === "Edit Profile" && <Profile />}
        {currentTab === "Notification Settings" && <Notification />}
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  breadcrum: { marginBottom: 30 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    // justifyContent: "space-around",
    marginVertical: 10,
    marginBottom: 30,
  },
  tabText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "500",
    color: "gray",
    flex: 1,
    textAlign: "center",
  },
});
