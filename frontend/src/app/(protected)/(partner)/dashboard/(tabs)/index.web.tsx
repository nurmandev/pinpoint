import ActiveLeadsCard from "@/src/components/partner/dashboard/ActiveLead";
import CompletedLead from "@/src/components/partner/dashboard/CompletedLead";
import LeadPool from "@/src/components/partner/dashboard/LeadPool";
import PendingLeadsCard from "@/src/components/partner/dashboard/PendinLeadCard";
import StatsSection from "@/src/components/partner/dashboard/StatSection";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Text } from "react-native-paper";

const Dashboard: React.FC = () => {
  const { width: WIDTH } = useWindowDimensions();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      {/* <Text style={styles.subheading}>
        Access to all your details on this page
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={styles.sectionHeading}>Stats</Text>
        <Feather name="edit" size={20} />
      </View>
      <StatsSection />
      <View>
        <View
          style={[
            styles.row,
            {
              flexDirection:
                Platform.OS === "web" && WIDTH > 768 ? "row" : "column",
            },
          ]}
        >
          <PendingLeadsCard />
          <ActiveLeadsCard />
        </View>
        <View
          style={[
            styles.row,
            {
              flexDirection:
                Platform.OS === "web" && WIDTH > 768 ? "row" : "column",
            },
          ]}
        >
          <LeadPool />
          <CompletedLead />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: "gray",
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    gap: 20,
    marginBottom: 20,
  },
});

export default Dashboard;
