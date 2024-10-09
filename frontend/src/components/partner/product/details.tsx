import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Divider, useTheme } from "react-native-paper";
import Rating from "../../Rating";
import Button from "../../Button";

const Details = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>
          Product Name <Text style={styles.price}>$1500.99</Text> -{" "}
          <Text style={styles.status}>Pending</Text>
        </Text>
      </View>

      {/* Sub details */}
      <Text style={[styles.subDetails, { color: colors.primary }]}>
        Clothing / Shirt / Gender: <Text style={{ color: "black" }}>Male</Text>{" "}
        - Color: <Text style={{ color: "black" }}>White</Text>{" "}
      </Text>
      <Divider style={{ marginVertical: 20 }} />
      <Text style={styles.deatail}> Details</Text>
      <Text style={styles.textGray}>Location assigned</Text>
      <Text style={{ fontWeight: "500" }}> Location Name 1</Text>
      <Text style={{ fontWeight: "500" }}> Location Name 2</Text>
      <Divider style={{ marginVertical: 20 }} />
      <Text style={styles.deatail}> Rating</Text>
      <Text style={styles.textGray}>Total Reviews</Text>
      <Text style={{ fontWeight: "500" }}>10</Text>
      <Text style={[styles.textGray, { marginTop: 20 }]}>Rating(5/5)</Text>
      <Rating show={false} rating={5} />
      <Text style={[styles.textGray, { marginTop: 20 }]}>Rating(5/5)</Text>
      <Image
        source={require("../../../../assets/images/product.png")}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.actionButtons}>
        <Button variant="outlined" containerStyle={styles.declineButton}>
          Edit
        </Button>
        <Button variant="contained" containerStyle={styles.approveButton}>
          Delete
        </Button>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  card: { paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceTitle: {
    // fontSize: 1,
    color: "gray",
  },
  price: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  status: {
    color: "#f39c12",
    // fontWeight: "500",
  },
  subDetails: {
    marginVertical: 10,
    // fontWeight: "500",
    fontSize: 13,
  },
  deatail: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 18,
  },
  textGray: {
    color: "#666",
    marginBottom: 5,
  },
  mainImage: { width: 150, height: 150, borderRadius: 10 },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  declineButton: {
    // borderColor: "#f8d7da",
    backgroundColor: "white",
    flex: 1,
  },
  approveButton: {
    // backgroundColor: "#007bff",
    flex: 1,
  },
});
