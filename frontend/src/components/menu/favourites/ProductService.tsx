import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Product } from "@/src/types/product";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const data = [
  {
    id: "1",
    name: "Product Name",
    options: "Buy Online - Shoping",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "11",
    name: "Service Name",
    options: "In Home Service",
    price: "$10.99",
    image: require("../../../../assets/images/service.png"),
  },
  {
    id: "2",
    name: "Product Name",
    options: "Buy Online - Shoping",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "12",
    name: "Service Name",
    options: "In Home Service",
    price: "$10.99",
    image: require("../../../../assets/images/service.png"),
  },
  {
    id: "3",
    name: "Product Name",
    options: "Buy Online - Shoping",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "13",
    name: "Service Name",
    options: "In Home Service",
    price: "$10.99",
    image: require("../../../../assets/images/service.png"),
  },
];

const ProductService = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RenderItem item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.productGrid}
    />
  );
};

const RenderItem = ({ item }: { item: Product }) => {
  const [liked, setLiked] = useState(true);
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text
          style={{ flexDirection: "row", alignItems: "center", color: "#888" }}
        >
          {item.options} <Ionicons name="checkmark" size={12} />
        </Text>

        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <AntDesign
            name={liked ? "heart" : "hearto"}
            size={20}
            color={liked ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductService;
const WIDTH = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  productGrid: {
    paddingBottom: 15,
    gap: 25,
  },
  card: {
    borderRadius: 20,
    width: WIDTH / 2 - 22.5,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: WIDTH / 2 - 22.5,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
