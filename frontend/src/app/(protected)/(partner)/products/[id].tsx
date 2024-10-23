import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Details from "@/src/components/partner/product/details";
import { useLocalSearchParams } from "expo-router";
import { useProduct } from "@/src/context/Product";
import { IProduct } from "@/src/types/product";
import { ActivityIndicator } from "react-native-paper";

const ProductDetail = () => {
  const { getProduct } = useProduct();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<IProduct | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getProduct(id as string);
        setProduct(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  console.log(id);
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {loading ? <ActivityIndicator /> : <Details product={product} />}
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
