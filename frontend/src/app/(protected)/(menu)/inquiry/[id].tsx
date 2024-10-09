import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Appbar, Menu, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/menu/inquiry/Section";
import Modal from "@/src/components/modals/modal";
import Delete from "@/src/components/menu/inquiry/Delete";

const Inquiry = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderOption = () => (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="ellipsis-vertical" size={25} color="gray" />
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <TouchableOpacity
        onPress={closeMenu}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <Ionicons name="pencil" size={20} />
        <Text>Modify</Text>
      </TouchableOpacity>
      <Delete />
    </Menu>
  );
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Lead Details" />
        {renderOption()}
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <View style={styles.selectedItem}>
          <Image
            source={require("../../../../../assets/images/product.png")}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userDetail}>
          <View style={styles.name}>
            <Text style={styles.fullname}>Location Name</Text>
            <Text style={styles.username}>Service Name</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/inquiry/chat")}
            style={{
              alignItems: "center",
              padding: 5,
              paddingHorizontal: 8,
              borderWidth: 1,
              borderColor: "#e1e1e1",
              borderRadius: 40,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} />
            <Text style={{ fontSize: 16 }}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu
          </Text>

          <Text
            style={[
              styles.sectionTitle,
              { marginTop: 10, fontWeight: "bold", fontSize: 20 },
            ]}
          >
            $1500.9
          </Text>
        </View>

        <View style={styles.section}>
          <View
            style={[{ flexDirection: "row", gap: 5, alignItems: "center" }]}
          >
            <Text style={{}}>Shipping Available</Text>
            <Ionicons name="checkmark" size={20} />
          </View>
          <View
            style={[{ flexDirection: "row", gap: 5, alignItems: "center" }]}
          >
            <Text style={{}}>Pickup</Text>
            <Ionicons name="checkmark" size={20} />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ flex: 1 }}>Gender:</Text>
            <Text style={{ flex: 3 }}>Male</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Color:</Text>
            <Text style={{ flex: 3 }}>White</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Retail</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionText, { marginBottom: 8 }]}>
            07-10-24, 09:00pm
          </Text>
          <Text style={styles.sectionText}>
            <Text style={styles.sectionTitle}> Urgency:</Text> Important
          </Text>
        </View>
        <Text
          onPress={() => router.push("/inquiry/review")}
          style={{
            color: colors.primary,
            fontSize: 12,
            fontWeight: "500",
            marginVertical: 20,
          }}
        >
          Leave a review
        </Text>
      </ScrollView>
    </View>
  );
};

export default Inquiry;

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  selectedItem: {
    // width: WIDTH,
    height: WIDTH * 0.6,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  userDetail: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  name: {},
  username: {
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 5,
  },
  fullname: { fontSize: 24, fontWeight: "600" },
  section: {
    // marginBottom: 16,
    paddingVertical: 24,
    // padding: 16,
    borderBlockColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
});
