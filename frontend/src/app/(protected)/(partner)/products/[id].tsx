import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import Details from "@/src/components/partner/product/details";

const ProductDetail = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Details />
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
