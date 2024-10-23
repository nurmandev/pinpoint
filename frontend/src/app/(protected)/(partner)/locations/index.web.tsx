import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox, Divider, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import LeadsModal from "@/src/components/partner/leads/LeadModal";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocation } from "@/src/context/Location";
import { data } from "@/src/components/onboarding/Onboarding";
import LoadingOverlay from "@/src/components/LoadingOverlay";

const Location = () => {
  const { colors } = useTheme();
  const { loadUserLocations, locations, deleteLocationById } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        await loadUserLocations();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.breadcrum}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Dashboard
        </Text>
        / Location
      </Text>
      <View style={styles.headerCont}>
        <Text style={styles.heading}>All Location</Text>
        <Button
          variant="outlined"
          containerStyle={{ width: 150, backgroundColor: "white" }}
          onPress={() => router.push("/locations/setup")}
        >
          Add Location
        </Button>
      </View>
      <View
        style={[
          styles.tableHeader,
          { backgroundColor: colors.elevation.level2 },
        ]}
      >
        <Text style={styles.tableHeaderText}>Location Name</Text>
        <Text style={styles.tableHeaderText}>Location Address</Text>
        <Text style={styles.tableHeaderText}>Description</Text>
        <Text style={styles.tableHeaderText}>Actions</Text>
      </View>
      <Divider />

      {loading && <LoadingOverlay />}
      {/* Table Rows */}
      {locations.length <= 0 && <Text>No Location Found</Text>}
      <ScrollView style={styles.tableBody}>
        {locations.map((loc) => (
          <View style={styles.tableRow} key={loc._id}>
            <Text style={styles.tableCell}>{loc.locationName}</Text>
            <Text style={styles.tableCell}>{loc.address}</Text>
            <Text style={styles.tableCell} numberOfLines={2}>
              {loc.description}
            </Text>
            <View style={styles.actionButtons}>
              <Feather
                onPress={() => router.push("/locations/setup")}
                name="edit"
                size={20}
                color="gray"
              />
              <Ionicons
                onPress={() => deleteLocationById(loc._id)}
                name="trash-outline"
                size={20}
                color="red"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Location;

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

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0e0e0",
    height: 50,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
  },
  tableBody: {
    flexGrow: 1,
    // maxHeight: "100%",
    backgroundColor: "white",
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  tableRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    // justifyContent: "center",
    gap: 10,
    flex: 1,
  },
});
