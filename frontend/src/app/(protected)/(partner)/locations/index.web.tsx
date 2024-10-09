import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Checkbox, Divider, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import LeadsModal from "@/src/components/partner/leads/LeadModal";
import { Feather, Ionicons } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "2",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "3",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "4",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "5",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
];
const Location = () => {
  const { colors } = useTheme();
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

      {/* Table Rows */}
      <ScrollView style={styles.tableBody}>
        {data.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.address}</Text>
            <Text style={styles.tableCell}>{item.description}</Text>
            <View style={styles.actionButtons}>
              <Feather name="edit" size={20} color="gray" />
              <Ionicons name="trash-outline" size={20} color="red" />
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
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
});
