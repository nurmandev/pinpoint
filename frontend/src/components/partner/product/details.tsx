import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, useTheme } from "react-native-paper";
import Rating from "../../Rating";
import Button from "../../Button";
import { useProduct } from "@/src/context/Product";
import { IProduct } from "@/src/types/product";
import { imageURL } from "@/src/services/api";
import { router } from "expo-router";

const Details: React.FC<{ product?: IProduct }> = ({ product }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>
          {product?.name} <Text style={styles.price}>${product?.price}</Text>
        </Text>
      </View>

      {/* Sub details */}
      <Text style={[styles.subDetails, { color: colors.primary }]}>
        {product?.category[0]} / {product?.subCategory} /{" "}
        {product?.options?.map((option) => (
          <Text>
            {option.optionCategory}:{" "}
            <Text style={{ color: "black" }}>{option.optionName}</Text>
            {" - "}
          </Text>
        ))}
      </Text>
      <Divider style={{ marginVertical: 20 }} />
      <Text style={styles.deatail}> Details</Text>
      <Text style={styles.textGray}>Location assigned</Text>
      {product?.location.map((loc) => (
        <Text style={{ fontWeight: "500" }}> {loc.locationName}</Text>
      ))}
      <Divider style={{ marginVertical: 20 }} />
      <Text style={styles.deatail}> Rating</Text>
      <Text style={styles.textGray}>Total Reviews</Text>
      <Text style={{ fontWeight: "500" }}>{product?.reviews?.length}</Text>
      <Text style={[styles.textGray, { marginTop: 20 }]}>
        Rating({product?.rating}/5)
      </Text>
      <Rating show={false} rating={product?.rating || 0} />
      <Text style={[styles.textGray, { marginTop: 20 }]}>
        Rating({product?.rating}/5)
      </Text>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {product?.images.map((image) => (
          <Image
            source={{ uri: imageURL + image }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        ))}
      </View>
      <View style={styles.actionButtons}>
        <Button
          variant="outlined"
          onPress={() => router.push("/products/add")}
          containerStyle={styles.declineButton}
        >
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
