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
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import Followers from "@/src/components/menu/Followers";
import Favourites from "@/src/components/menu/Favourites";
import Activity from "@/src/components/Activity";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("Activity");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="white"
          onPress={() => router.back()}
        />
        <Entypo name="dots-three-horizontal" size={30} color="white" />
      </View>
      <ScrollView>
        <View style={styles.selectedItem}>
          <Image
            source={require("../../../../../assets/images/user1.png")}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.userDetail}>
            <View style={styles.name}>
              <Text style={styles.username}>@username</Text>
              <Text style={styles.fullname}>User Name</Text>
            </View>
            <View style={styles.other}>
              <View style={styles.badge}>
                {[1, 2, 3].map((index) => (
                  <Image
                    key={index}
                    source={require("../../../../../assets/images/badge.png")}
                    style={styles.badgeImage}
                    resizeMode="contain"
                  />
                ))}
              </View>
              <View style={styles.badge}>
                {[1, 2, 3].map((index) => (
                  <Image
                    key={index}
                    source={require("../../../../../assets/images/badge.png")}
                    style={styles.badgeImage}
                    resizeMode="contain"
                  />
                ))}
              </View>
              <View style={styles.followerCont}>
                <View style={styles.otherpics}>
                  <BlurView
                    intensity={100}
                    tint="dark"
                    style={styles.mainImage}
                  >
                    <Image
                      source={require("../../../../../assets/images/user1.png")}
                      style={styles.mainImage}
                      resizeMode="cover"
                    />
                  </BlurView>
                  <Text style={[styles.username, { position: "absolute" }]}>
                    +2
                  </Text>
                </View>
                <View style={styles.followers}>
                  <Text style={styles.followersText}>312 Followers</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tabcont}>
          <TouchableOpacity
            onPress={() => setCurrentTab("Activity")}
            style={[
              styles.tab,
              currentTab === "Activity" && { backgroundColor: "#f1f1f1" },
            ]}
          >
            <Text style={styles.tabText}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentTab("Followers")}
            style={[
              styles.tab,
              currentTab === "Followers" && { backgroundColor: "#f1f1f1" },
            ]}
          >
            <Text style={styles.tabText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentTab("Favourites")}
            style={[
              styles.tab,
              currentTab === "Favourites" && { backgroundColor: "#f1f1f1" },
            ]}
          >
            <Text style={styles.tabText}>Favourites</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherContent}>
          {currentTab === "Activity" && <Activity />}
          {currentTab === "Followers" && <Followers />}
          {currentTab === "Favourites" && <Favourites />}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    zIndex: 20,
  },
  selectedItem: {
    width: WIDTH,
    height: WIDTH,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  userDetail: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
  },
  name: {},
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 5,
  },
  fullname: { color: "white", fontSize: 24, fontWeight: "600" },
  other: {},
  badge: { flexDirection: "row", gap: 1, justifyContent: "flex-end" },
  followerCont: { flexDirection: "row", gap: 8 },
  followers: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    borderRadius: 5,
  },
  followersText: { color: "white", fontSize: 20 },
  otherpics: {
    width: 60,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: 30,
    height: 30,
  },
  otherContent: {},
  tabcont: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 2,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  tab: {
    borderRadius: 5,
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: { fontSize: 19 },
});
