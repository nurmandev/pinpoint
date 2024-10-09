import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
  {
    id: "2",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
  {
    id: "3",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
  {
    id: "4",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
  {
    id: "5",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
  {
    id: "6",
    name: "Location Name",
    couponId: "#OCD6RSB9",
    exp: "01/12/2024",
    percentage: "-10%",
    image: require("../../../../../assets/images/product.png"),
  },
];

const WIDTH = Dimensions.get("screen").width;
const Badges = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/coupons/item")}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, marginTop: 10 }}>Coupon ID</Text>
            <Text style={styles.price}>{item.couponId}</Text>
          </View>
          {/* <Text style={{ fontSize: 25 }}>{item.percentage}</Text> */}
        </View>
        <Text style={{ fontSize: 12 }}>Exp: {item.exp}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Coupons" />
        <Ionicons name="menu" size={24} style={{ marginRight: 16 }} />
      </Appbar.Header>
      <View style={{ padding: 15, flex: 1 }}>
        <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}>
          Active Coupons
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ gap: 15 }}
        />
      </View>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: WIDTH / 2 - 22.5,
    marginRight: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  image: {
    width: "100%",
    height: WIDTH / 2 - 80,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
});
