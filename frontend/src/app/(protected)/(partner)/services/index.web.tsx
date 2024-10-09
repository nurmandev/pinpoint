import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import Rating from "@/src/components/Rating";
import Modal from "@/src/components/modals/modal";
import Details from "@/src/components/partner/product/details";
import { rated, services } from "@/src/utils/data/services";

const Location = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.breadcrum}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Dashboard
        </Text>{" "}
        / Service
      </Text>
      <View style={styles.headerCont}>
        <Text style={styles.heading}> Service</Text>
        <Button
          containerStyle={{ width: 150 }}
          onPress={() => router.push("/services/add")}
        >
          Add Service
        </Button>
      </View>
      <ScrollView style={styles.tableBody}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text style={styles.subTitle}>Service</Text>
          <View
            style={[
              styles.tableHeader,
              { backgroundColor: colors.elevation.level2 },
            ]}
          >
            <Text style={styles.tableHeaderText}>Service Name</Text>
            <Text style={styles.tableHeaderText}>Price</Text>
            <Text style={styles.tableHeaderText}>Location(s) assigned</Text>
            <Text style={styles.tableHeaderText}>Category</Text>
            <Text style={styles.tableHeaderText}>Subcategory</Text>
            <Text style={styles.tableHeaderText}>Variants</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          <Divider />

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {services.map((item) => (
              <Modal
                key={item.id}
                button={
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.price}</Text>
                    <Text style={styles.tableCell}>{item.location}</Text>
                    <Text style={styles.tableCell}>{item.category}</Text>
                    <Text style={styles.tableCell}>{item.subCategory}</Text>
                    <Text style={styles.tableCell}>
                      <Text style={styles.variant}>Male</Text>
                      <Text style={styles.variant}>White</Text>
                    </Text>
                    <View style={styles.actionButtons}>
                      <Feather name="link" size={20} color="gray" />
                      <Feather name="edit" size={20} color="gray" />
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </View>
                  </View>
                }
              >
                <Details />
              </Modal>
            ))}
          </ScrollView>
        </View>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={styles.subTitle}>Rated Service</Text>
          <View
            style={[
              styles.tableHeader,
              { backgroundColor: colors.elevation.level2 },
            ]}
          >
            <Text style={styles.tableHeaderText}>Service Name</Text>
            <Text style={styles.tableHeaderText}>Variant</Text>
            <Text style={styles.tableHeaderText}>Price</Text>
            <Text style={styles.tableHeaderText}>Customer name</Text>
            <Text style={styles.tableHeaderText}>Purchase Date</Text>
            <Text style={styles.tableHeaderText}>Rating</Text>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Photo</Text>
          </View>
          <Divider />

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {rated.map((item) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>
                  <Text style={styles.variant}>Male</Text>
                  <Text style={styles.variant}>White</Text>
                </Text>
                <Text style={styles.tableCell}>{item.price}</Text>
                <Text style={styles.tableCell}>{item.customer}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>{" "}
                <View style={[styles.actionButtons]}>
                  <Rating rating={item.rating} show={false} />
                </View>
                <Text style={styles.tableCell}>{item.description}</Text>
                <View style={styles.actionButtons}>
                  <Image
                    source={require("../../../../../assets/images/service.png")}
                    style={styles.mainImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
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
    minHeight: 50,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
  },
  tableBody: {
    flexGrow: 1,
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
    justifyContent: "flex-start",
    flex: 1,
    gap: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  variant: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 2,
    marginHorizontal: 5,
    borderColor: "#e1e1e1",
  },
  mainImage: { width: 50, height: 50, borderRadius: 10 },
});
