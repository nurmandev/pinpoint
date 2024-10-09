import ActiveLeadsCard from "@/src/components/partner/dashboard/ActiveLead";
import CompletedLead from "@/src/components/partner/dashboard/CompletedLead";
import LeadPool from "@/src/components/partner/dashboard/LeadPool";
import PendingLeadsCard from "@/src/components/partner/dashboard/PendinLeadCard";
import StatsSection from "@/src/components/partner/dashboard/StatSection";
import MultiSelect from "@/src/components/select/MultiSelect";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 12,
          marginTop: 5,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Text style={styles.sectionHeading}>Stats</Text>
          <MultiSelect
            button={<Feather name="edit" size={20} />}
            onValuesChange={() => {}}
            options={[]}
            containerStyle={{ borderWidth: 0, paddingVertical: 0 }}
          />
        </View>
        <StatsSection />
      </View>
      <View>
        <View
          style={[
            styles.row,
            {
              flexDirection: "column",
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
