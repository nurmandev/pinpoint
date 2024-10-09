import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/menu/inquiry/Section";
import Button from "@/src/components/Button";
import Pending from "@/src/components/menu/inquiry/Pending";
import Active from "@/src/components/menu/inquiry/Active";
import Completed from "@/src/components/menu/inquiry/Completed";

const inquiry = () => {
  const [currentTab, setCurrentTab] = useState("Pending");
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Inquires" />
      </Appbar.Header>

      <View style={styles.tabContainer}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab("Pending")}
            variant={currentTab === "Pending" ? "contained" : "outlined"}
          >
            Pending
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab("Active")}
            variant={currentTab === "Active" ? "contained" : "outlined"}
          >
            Active
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab("Completed")}
            variant={currentTab === "Completed" ? "contained" : "outlined"}
          >
            Completed
          </Button>
        </View>
      </View>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        {currentTab === "Pending" && <Pending />}
        {currentTab === "Active" && <Active />}
        {currentTab === "Completed" && <Completed />}
      </ScrollView>
    </View>
  );
};

export default inquiry;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
  },
});
