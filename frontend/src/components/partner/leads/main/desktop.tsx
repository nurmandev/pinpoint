// LeadsDesktop.tsx
import Button from "@/src/components/Button";
import Modal from "@/src/components/modals/modal";
import LeadsModal from "@/src/components/partner/leads/LeadModal";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import {
  Appbar,
  TextInput,
  Divider,
  Text,
  IconButton,
  useTheme,
  Checkbox,
} from "react-native-paper";

const data = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  username: "Username Name",
  service: "Service Name",
  location: "Location Name",
  date: "MM/DD/YYYY, 09:00 AM",
  price: "$1500.99",
}));

const LeadsDesktop: React.FC = () => {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("Pending");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}

      <Text style={styles.breadcrum}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Dashboard
        </Text>{" "}
        / Leads
      </Text>
      <Text style={styles.heading}>Leads</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Pending", "Active", "Lead Pool", "Completed"].map((item) => (
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

      {/* Search and Action Buttons */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Search here..."
          placeholderTextColor={"gray"}
          outlineStyle={{ borderColor: "gray" }}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Button
            variant="outlined"
            containerStyle={{
              paddingVertical: 5,
              backgroundColor: "white",
              flex: 1,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
            >
              <Ionicons name="filter" size={16} />
              <Text>Filter</Text>
            </View>
          </Button>

          <Button
            variant="outlined"
            containerStyle={{
              paddingVertical: 5,
              backgroundColor: "white",
              flex: 1,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
            >
              <Feather name="upload" size={16} />
              <Text>Export</Text>
            </View>
          </Button>
        </View>
      </View>

      {/* Table Header */}
      <View
        style={[
          styles.tableHeader,
          { backgroundColor: colors.elevation.level2 },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
          <Text style={styles.tableHeaderText}>User Name</Text>
        </View>
        <Text style={styles.tableHeaderText}>Service Name</Text>
        <Text style={styles.tableHeaderText}>Location Name</Text>
        <Text style={styles.tableHeaderText}>Date & Time</Text>
        <Text style={styles.tableHeaderText}>Price</Text>
        <Text style={styles.tableHeaderText}>Actions</Text>
      </View>
      <Divider />

      {/* Table Rows */}
      <ScrollView style={styles.tableBody}>
        {data.map((item) => (
          <Modal
            key={item.id}
            button={
              <View style={styles.tableRow}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Checkbox.Android
                    status="unchecked"
                    uncheckedColor="#e1e1e1"
                  />
                  <Text style={styles.tableCell}>{item.username}</Text>
                </View>
                <Text style={styles.tableCell}>{item.service}</Text>
                <Text style={styles.tableCell}>{item.location}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>
                <Text style={styles.tableCell}>{item.price}</Text>
                <View style={styles.actionButtons}>
                  <Button
                    variant="contained"
                    containerStyle={styles.approveButton}
                    textStyle={{ color: "#148F80", fontWeight: "400" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    containerStyle={styles.declineButton}
                    textStyle={{ color: "#D63232", fontWeight: "400" }}
                  >
                    Decline
                  </Button>
                </View>
              </View>
            }
          >
            {(close) => <LeadsModal />}
          </Modal>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Text>Showing Bookings per page 12</Text>
        <View style={styles.paginationControls}>
          <IconButton icon="chevron-left" />
          <Text>1-12 of 108</Text>
          <IconButton icon="chevron-right" />
        </View>
      </View>
    </View>
  );
};

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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  searchInput: {
    // flex: 1,
    height: 40,
    marginRight: 10,
  },
  filterButton: {
    marginHorizontal: 5,
  },
  exportButton: {
    marginHorizontal: 5,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
  },
  tableBody: {
    flexGrow: 1,
    // maxHeight: "50%",
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
    flex: 1,
  },
  approveButton: {
    marginRight: 5,
    backgroundColor: "#CAF1EC",
    borderColor: "#93DDD3",
    paddingVertical: 5,
    maxHeight: 30,
    flex: 1,
  },
  declineButton: {
    borderColor: "#FFE1E1",
    backgroundColor: "#FFEEEE",
    paddingVertical: 5,
    maxHeight: 30,
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LeadsDesktop;
