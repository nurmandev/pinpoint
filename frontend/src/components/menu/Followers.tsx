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

const { width } = Dimensions.get("screen");

const users = [
  { id: "1", name: "User Name", username: "@username", following: false },
  { id: "2", name: "User Name", username: "@username", following: true },
  { id: "3", name: "User Name", username: "@username", following: false },
  { id: "4", name: "User Name", username: "@username", following: true },
  { id: "5", name: "User Name", username: "@username", following: false },
  { id: "6", name: "User Name", username: "@username", following: false },
  { id: "7", name: "User Name", username: "@username", following: true },
  { id: "8", name: "User Name", username: "@username", following: false },
];

const Followers = () => {
  const [search, setSearch] = useState("");

  const toggleFollow = (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    users[index].following = !users[index].following;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <Image
        source={{
          uri: "https://randomuser.me/api/portraits/men/1.jpg",
        }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={[styles.followButton, item.following && styles.followingButton]}
        onPress={() => toggleFollow(item.id)}
      >
        <Text
          style={[
            styles.followButtonText,
            item.following && styles.followingText,
          ]}
        >
          {item.following ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchInputCont}>
        <Ionicons name="search" size={30} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {users.map((item) => (
        <View key={item.id}>{renderItem({ item })}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchInputCont: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: { flex: 1, paddingHorizontal: 15 },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userUsername: {
    fontSize: 14,
    color: "#888",
  },
  followButton: {
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
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followingText: {
    color: "#000",
  },
});

export default Followers;
