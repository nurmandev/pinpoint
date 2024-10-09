// LeadsMobile.tsx
import Select from "@/src/components/Select";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

const type = [
  { label: "Active Leads", value: "active" },
  { label: "Pending Leads", value: "pending" },
  { label: "Leads Pool", value: "pool" },
  { label: "Completed Leads", value: "completed" },
];

const LeadsMobile: React.FC = () => {
  const { colors } = useTheme();
  const [selectedLeadType, setSelectedLeadType] = useState<string | number>(
    "active"
  );

  // Sample data for leads
  const leads = Array(5).fill({
    username: "Username Name",
    serviceName: "Service Name",
    locationName: "Location Name",
    date: "MM/DD/YYYY, 09:00 AM",
    price: "$1500.99",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 15, backgroundColor: "white", marginTop: 5 }}>
        {/* Dropdown Menu */}
        <Select
          selectedValue={selectedLeadType}
          onValueChange={(value) => setSelectedLeadType(value)}
          options={type}
          containerStyle={{
            backgroundColor: colors.elevation.level2,
            borderColor: colors.elevation.level5,
          }}
        />
        <View
          style={{ borderWidth: 1, borderColor: "#e1e1e1", marginVertical: 20 }}
        />
        {/* Search Input */}
        <TextInput
          mode="outlined"
          placeholder="Search here"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{ borderColor: colors.primary, borderRadius: 10 }}
        />

        {/* Leads List */}
        <View style={[styles.scrollView, styles.listContainer]}>
          {leads.map((lead, index) => (
            <TouchableOpacity
              onPress={() => router.push("/leads/id")}
              key={index}
              style={[
                styles.leadCard,
                styles.mobileCard,
                { borderColor: colors.elevation.level5 },
              ]}
            >
              <View style={styles.cardContent}>
                <Text
                  style={[
                    styles.username,
                    { backgroundColor: colors.elevation.level2 },
                  ]}
                >
                  {lead.username}
                </Text>
                <View style={{ padding: 10, gap: 15 }}>
                  <Text>
                    <Text style={styles.title}>Service Name: </Text>
                    {lead.serviceName}
                  </Text>
                  <Text>
                    <Text style={styles.title}>Location Name: </Text>
                    {lead.locationName}
                  </Text>
                  <Text>
                    <Text style={styles.title}>Date & Time: </Text>
                    {lead.date}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderTopColor: "#e1e1e1",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ flex: 1 }}>
                      <Text style={styles.title}>Price: </Text>
                      {lead.price}
                    </Text>

                    <Text style={{ color: "red", flex: 1 }}>
                      <Text style={styles.title}>Urgency: </Text>
                      Important
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButtonContent: {
    flexDirection: "row",
  },
  menuButtonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    // marginHorizontal: 16,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 15,
  },
  listContainer: {
    // paddingHorizontal: 16,
    paddingBottom: 20,
  },
  leadCard: {
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  mobileCard: {
    marginHorizontal: 0, // Remove side margins for mobile
  },
  cardContent: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
});

export default LeadsMobile;
