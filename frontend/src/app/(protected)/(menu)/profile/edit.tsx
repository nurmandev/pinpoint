import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";

const Edit = () => {
  const { colors } = useTheme();
  const [password, setPassword] = useState("12345678/");

  const renderGridItem = (icon: React.ReactNode, label: string) => (
    <TouchableOpacity style={styles.gridItem}>
      {icon}
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Manage Profile" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: colors.primary,
            marginRight: 16,
          }}
        >
          Apply
        </Text>
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.selectedItem}>
          <Image
            source={require("../../../../../assets/images/user1.png")}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.editCont}>
            <Feather name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.userDetail}>
          <View style={styles.name}>
            <Text style={styles.fullname}>Username Last name</Text>
            <Text style={styles.username}>User nickname</Text>
          </View>
        </View>
        <TextInput placeholder="First Name" />
        <TextInput placeholder="Last Name" />
        <TextInput placeholder="State" />
        <TextInput placeholder="City" />
        <TextInput
          placeholder=""
          value={password}
          onChangeText={(text) => setPassword(text)}
          isPassword
        />
        <Text style={{ color: colors.primary, fontWeight: "600" }}>
          Change Password
        </Text>
      </ScrollView>
    </View>
  );
};

export default Edit;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  selectedItem: {
    // width: WIDTH,
    height: WIDTH * 0.5,
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
  editCont: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
  },
  container: { borderTopColor: "#f1f1f1", borderTopWidth: 1, paddingTop: 30 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 15,
  },
  gridItem: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
  },
  gridLabel: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#555",
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    borderColor: "#f00",
    borderWidth: 1,
  },
  deleteText: {
    fontSize: 16,
    color: "#f00",
  },
});
