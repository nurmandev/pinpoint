import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUser } from "@/src/context/User";

const Settings = () => {
  const { colors } = useTheme();
  const { logout } = useUser();

  const [currentTab, setCurrentTab] = useState("Edit Profile");
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => router.push("/settings/profile")}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Edit Profile</Text>
          <Feather name="edit" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/settings/notification")}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Edit Notification</Text>
          <Feather name="bell" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="log-out-outline" size={24} color="#555" />
        </TouchableOpacity>
        <View
          style={[
            styles.logoutButton,
            { position: "absolute", bottom: 20, left: 10, right: 10 },
          ]}
        >
          <Text style={styles.logoutText}>Delete Account</Text>
          <Ionicons name="trash-outline" size={24} color="red" />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    backgroundColor: "#fff",
    marginTop: 5,
    flex: 1,
    padding: 10,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  logoutText: {
    fontSize: 18,
  },
});
