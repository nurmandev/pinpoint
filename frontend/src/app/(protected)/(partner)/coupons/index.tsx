import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import React from "react";
import Button from "@/src/components/Button";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import useDimensions from "@/src/hooks/useDimension";
import { Ionicons } from "@expo/vector-icons";
import Modal from "@/src/components/modals/modal";
import Create from "@/src/components/partner/coupon/Create";

const data: any = [
  // {
  //   id: "1",
  //   name: "Location Name",
  //   couponId: "#OCD6RSB9",
  //   exp: "01/12/2024",
  //   percentage: "-10%",
  //   image: require("../../../../../assets/images/product.png"),
  // },
];

const Coupons = () => {
  const { colors } = useTheme();
  const { width, isMobile } = useDimensions();
  return (
    <>
      {/* {Platform.OS !== "web" && (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Coupon" />
        </Appbar.Header>
      )} */}
      <View style={styles.container}>
        {Platform.OS === "web" && (
          <>
            <Text style={styles.breadcrum}>
              <Text style={{ color: colors.primary, fontWeight: "500" }}>
                Dashboard
              </Text>{" "}
              / Coupons
            </Text>
            <View style={styles.headerCont}>
              <Text style={styles.heading}> Coupons</Text>
              <Modal
                button={
                  <Button
                    variant="outlined"
                    containerStyle={{ width: 150, backgroundColor: "white" }}
                    disabled
                  >
                    Generate Coupon
                  </Button>
                }
              >
                {(close) => <Create onClose={close} />}
              </Modal>
            </View>
          </>
        )}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.subheading}>Active Coupons</Text>

            {Platform.OS !== "web" && (
              <Button
                containerStyle={{ width: 150, backgroundColor: colors.primary }}
                onPress={() => router.push("/coupons/add")}
              >
                Generate Coupon
              </Button>
            )}
          </View>
          <View
            style={{ flex: 1, flexWrap: "wrap", gap: 15, flexDirection: "row" }}
          >
            {data.length <= 0 && <Text>No coupon available</Text>}
            {data.map((item: any) => (
              <TouchableOpacity
                onPress={() => router.push("/coupons/uhh")}
                style={[
                  styles.card,
                  {
                    width: !isMobile
                      ? (width - 280) * 0.25
                      : (width - 70) * 0.5,
                  },
                ]}
                key={item.id}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.image,
                    {
                      height: !isMobile
                        ? (width - 280) * 0.25
                        : (width - 50) * 0.5,
                    },
                  ]}
                />
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 12, marginTop: 10 }}>
                        Coupon ID
                      </Text>
                      <Text style={styles.price}>{item.couponId}</Text>
                    </View>
                    <Text style={{ fontSize: 20 }}>{item.percentage}</Text>
                  </View>
                  <Text style={{ fontSize: 12 }}>Exp: {item.exp}</Text>
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="red"
                    style={styles.delete}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Coupons;

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
  content: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    width: 200,
    // marginRight: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    // fontSize: 18,
    marginBottom: 4,
    fontWeight: "500",
  },
  price: {
    // fontSize: 18,
    marginBottom: 8,
  },
  delete: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
