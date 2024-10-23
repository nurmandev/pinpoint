import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/menu/inquiry/Section";
import Button from "@/src/components/Button";
import Pending from "@/src/components/menu/inquiry/Pending";
import Active from "@/src/components/menu/inquiry/Active";
import Completed from "@/src/components/menu/inquiry/Completed";
import { getUserLeads } from "@/src/services/lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";

const inquiry = () => {
  const [currentTab, setCurrentTab] = useState("Pending");
  const { addNotification } = useToastNotification();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        setLoading(true);
        console.log(currentTab);
        const res = await getUserLeads(
          currentTab === "Completed" ? "Complete" : currentTab
        );
        setLeads(res.leads);
      } catch (error: any) {
        addNotification(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLLeads();
  }, [currentTab]);

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
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {currentTab === "Pending" && <Pending leads={leads} />}
            {currentTab === "Active" && <Active leads={leads} />}
            {currentTab === "Completed" && <Completed leads={leads} />}
          </>
        )}
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
