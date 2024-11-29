// LeadsMobile.tsx
import Select from "@/src/components/Select";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export const type = [
  { label: "Active Leads", value: "Active" },
  { label: "Pending Leads", value: "Pending" },
  { label: "Leads Pool", value: "Pool" },
  { label: "Completed Leads", value: "Completed" },
];

const LeadsMobile: React.FC = () => {
  const { colors } = useTheme();
  const { leads, fetchPartnerLeads, loading } = useLead();
  const { addNotification } = useToastNotification();
  const [selectedLeadType, setSelectedLeadType] = useState<string>("Active");

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        await fetchPartnerLeads(
          selectedLeadType === "Completed" ? "Complete" : selectedLeadType
        );
      } catch (error: any) {
        addNotification(error);
      }
    };
    fetchLLeads();
  }, [selectedLeadType]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 15, backgroundColor: "white", marginTop: 5 }}>
        {/* Dropdown Menu */}
        <Select
          selectedValue={selectedLeadType}
          onValueChange={(value) => setSelectedLeadType(value as string)}
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
          {loading ? (
            <ActivityIndicator />
          ) : leads.length <= 0 ? (
            <Text>No {selectedLeadType} Lead</Text>
          ) : (
            leads.map((lead) => (
              <TouchableOpacity
                onPress={() => router.push(`/leads/${lead._id}`)}
                key={lead._id}
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
                    {lead.customerName}
                  </Text>
                  <View style={{ padding: 10, gap: 15 }}>
                    <Text>
                      <Text style={styles.title}>Service Name: </Text>
                      {lead.item.name}
                    </Text>
                    <Text>
                      <Text style={styles.title}>Location Name: </Text>
                      {lead.location.locationName}
                    </Text>
                    <Text>
                      <Text style={styles.title}>Date & Time: </Text>
                      {moment(lead.createdAt).calendar()}
                    </Text>

                    {lead.status === "Complete" && (
                      <Text>
                        <Text style={styles.title}>Date Complete: </Text>
                        {moment(lead.dateCompleted).calendar()}
                      </Text>
                    )}
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
                        {lead.item?.priceType === "range"
                          ? `$${lead.item?.priceRange?.from} - $${lead.item?.priceRange?.to}`
                          : `$${lead.item?.price}`}
                      </Text>

                      {lead.status === "Pending" && (
                        <Text style={{ color: "red", flex: 1 }}>
                          <Text style={styles.title}>Urgency: </Text>
                          Important
                        </Text>
                      )}
                      {lead.status === "Complete" && (
                        <Text
                          style={{
                            color: lead.reason === "Complete" ? "green" : "red",
                            flex: 1,
                          }}
                        >
                          {lead.reason}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
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
