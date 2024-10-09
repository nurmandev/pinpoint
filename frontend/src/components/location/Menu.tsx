import { lightColors } from "@/src/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Select from "../Select";
import Rating from "../Rating";

const { width } = Dimensions.get("screen");

const services = [
  {
    id: "1",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "2",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "3",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "4",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "5",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "6",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "7",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
  {
    id: "8",
    image: require("../../../assets/images/feeds/feed2.png"),
    name: "Service Name",
    description: "Service des ription goes here",
    info: "In-Home Service",
  },
];

const products = [
  {
    id: "1",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "2",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "3",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "4",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "5",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "6",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "7",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
  {
    id: "8",
    image: require("../../../assets/images/product.png"),
    name: "Product Name",
    description: "Product description goes here",
    info: "Buy Online - Shopping",
  },
];

const options = [
  { label: "Product", value: "product" },
  { label: "Services", value: "services" },
];

const Menu = () => {
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("product");

  const handleOnChange = (value: string | number) => {
    setSelectedValue(value as string);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Rating rating={5} show={false} />
        <Text style={styles.description}>
          {item.info}
          <Ionicons name="chevron-down" size={12} />
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.userName, { marginBottom: 20 }]}>$10.99</Text>
        <TouchableOpacity style={[styles.button]}>
          <Text
            style={[styles.buttonText, item.following && styles.followingText]}
          >
            Pinpoint
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Select
        onValueChange={handleOnChange}
        options={options}
        selectedValue={selectedValue}
        containerStyle={{ width: "40%", marginBottom: 20 }}
      />
      {(selectedValue === "product" ? products : services).map((item) => (
        <View key={item.id}>{renderItem({ item })}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#888",
    marginVertical: 3,
  },
  button: {
    backgroundColor: lightColors.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followingText: {
    color: "#000",
  },
});

export default Menu;
