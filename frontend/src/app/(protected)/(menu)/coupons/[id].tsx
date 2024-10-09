import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";

const WIDTH = Dimensions.get("screen").width;
const Badges = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.card}>
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
          <Text style={{ fontSize: 25 }}>{item.percentage}</Text>
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
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <View style={styles.card}>
          <Image
            source={require("../../../../../assets/images/product.png")}
            style={styles.image}
          />

          <Text style={[styles.name, { color: colors.primary }]}>
            The Star Place
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>16% Off</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 12, marginTop: 10 }}>Coupon ID</Text>
            <Text style={styles.price}>#OCD6RSB9</Text>
          </View>
          <Text style={{ fontSize: 12 }}>Exp: 01/12/2024</Text>
        </View>
        <Button containerStyle={{ marginBottom: 15 }}>Redeem Coupon</Button>
        <Button variant="outlined">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="trash" size={16} />
            <Text>Delete Coupon</Text>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: WIDTH - 30,
    marginRight: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: WIDTH - 60,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
});
