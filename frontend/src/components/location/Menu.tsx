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
import { IService } from "@/src/types/service";
import { IProduct } from "@/src/types/product";
import { imageURL } from "@/src/services/api";
import useDimensions from "@/src/hooks/useDimension";

const options = [
  { label: "Product", value: "product" },
  { label: "Services", value: "services" },
];

interface Props {
  products: IProduct[];
  services: IService[];
}
const Menu: React.FC<Props> = ({ products, services }) => {
  const { width } = useDimensions();
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("product");

  const handleOnChange = (value: string | number) => {
    setSelectedValue(value as string);
  };

  const renderItem = ({ item }: any) => {
    const availableOptions = [
      item.availableOnline && "Buy Online",
      item.ships && "Shipping",
      item.homeService && "In-Home Service",
    ].filter(Boolean);
    return (
      <View style={styles.userContainer}>
        <Image
          source={{ uri: imageURL + item.images[0] }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text
            style={[styles.description, { maxWidth: width * 0.45 }]}
            numberOfLines={1}
          >
            {item.description}
          </Text>
          <Rating rating={item.rating} show={false} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={{ color: "#888" }}>
              {availableOptions.join(" + ")}
            </Text>
            {availableOptions.length > 0 && (
              <Ionicons name="checkmark" size={15} />
            )}
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.userName, { marginBottom: 20 }]}>
            {item.priceType === "range"
              ? `$${item?.priceRange?.from} - $${item?.priceRange?.to}`
              : `$${item.price}`}
          </Text>
          <TouchableOpacity style={[styles.button]}>
            <Text
              style={[
                styles.buttonText,
                item.following && styles.followingText,
              ]}
            >
              Pinpoint
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Select
        onValueChange={handleOnChange}
        options={options}
        selectedValue={selectedValue}
        containerStyle={{ width: "40%", marginBottom: 20 }}
      />
      {selectedValue === "product" ? (
        products.length <= 0 ? (
          <Text>No Product Available</Text>
        ) : (
          products.map((item) => (
            <View key={item._id}>{renderItem({ item })}</View>
          ))
        )
      ) : services.length <= 0 ? (
        <Text>No Service Available</Text>
      ) : (
        services.map((item) => (
          <View key={item._id}>{renderItem({ item })}</View>
        ))
      )}
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
