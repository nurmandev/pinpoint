import { useUser } from "@/src/context/User";
import { imageURL } from "@/src/services/api";
import { User } from "@/src/types/user";
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

const Followers = () => {
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const toggleFollow = (id: string) => {
    //
  };

  const renderItem = ({ item }: { item: User }) => {
    const isFollowing = user?.following.includes(item._id);
    return (
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: imageURL + item.avatarUrl,
          }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.userUsername}>{item.username}</Text>
        </View>
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={() => toggleFollow(item._id)}
        >
          <Text
            style={[
              styles.followButtonText,
              isFollowing && styles.followingText,
            ]}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
      {user?.follower && user?.follower.length <= 0 ? (
        <Text>No Follower</Text>
      ) : (
        user?.follower.map((item) => (
          <View key={item._id}>{renderItem({ item })}</View>
        ))
      )}
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
