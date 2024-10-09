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
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { Menu } from "react-native-paper";
import Rating from "@/src/components/Rating";
import Button from "@/src/components/Button";
import Info from "@/src/components/location/Info";
import Activity from "@/src/components/Activity";
import Vote from "@/src/components/location/Vote";
import MenuTab from "@/src/components/location/Menu";

const Location = () => {
  const [currentTab, setCurrentTab] = useState("Info");
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="white"
          onPress={() => router.back()}
        />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Ionicons name="ellipsis-horizontal" size={25} color="white" />
            </TouchableOpacity>
          }
          anchorPosition="bottom"
          mode="flat"
        >
          <TouchableOpacity
            onPress={closeMenu}
            style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
          >
            <Ionicons name="flag-outline" size={20} />
            <Text>Report Partner</Text>
          </TouchableOpacity>
        </Menu>
      </View>
      <ScrollView>
        <View style={styles.selectedItem}>
          <Image
            source={require("../../../../../assets/images/feeds/feed2.png")}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.userDetail}>
            <View style={styles.name}>
              <Text style={styles.username}>@burgerplace</Text>
              <Text style={styles.fullname}>The Burger Place</Text>
              <Rating rating={4.5} />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text style={{ color: "white", fontWeight: "300" }}>
                  13 reviews
                </Text>
                <Ionicons name="chevron-forward" size={14} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.other}>
              <View style={styles.followerCont}>
                <View style={styles.followers}>
                  <Text style={styles.followersText}>312 Followers</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/location/pictures")}
                  style={styles.otherpics}
                >
                  <BlurView
                    intensity={100}
                    tint="dark"
                    style={styles.mainImage}
                  >
                    <Image
                      source={require("../../../../../assets/images/feeds/feed1.png")}
                      style={styles.mainImage}
                      resizeMode="cover"
                    />
                  </BlurView>
                  <Text style={[styles.username, { position: "absolute" }]}>
                    +2
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <View style={{}}>
            <Text style={{ marginBottom: 5 }}>
              <Text style={{ color: "#07d64c", fontWeight: "bold" }}>Open</Text>{" "}
              till 5:00pm
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 10,
              }}
            >
              Yori house, Rivers Street
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                variant="outlined"
                containerStyle={{
                  paddingVertical: 5,
                  backgroundColor: "white",
                  flex: 1,
                }}
              >
                <View
                  style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
                >
                  <Ionicons name="mail-outline" size={16} />
                  <Text>Chat</Text>
                </View>
              </Button>
              <Button
                variant="contained"
                containerStyle={{ paddingVertical: 5, flex: 1 }}
              >
                <View
                  style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
                >
                  <Feather name="user-check" size={16} color="white" />
                  <Text style={{ color: "white" }}>Follow</Text>
                </View>
              </Button>
            </View>

            <Button
              variant="outlined"
              containerStyle={{
                paddingVertical: 5,
                marginTop: 15,
                backgroundColor: "white",
                flex: 1,
              }}
            >
              <View
                style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
              >
                <Entypo name="location" size={16} />
                <Text>Check In</Text>
              </View>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: 110,
            }}
          >
            <View>
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
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Vote />
              <Ionicons name="heart-outline" size={28} />
            </View>
          </View>
        </View>
        <View style={styles.tabcont}>
          <TouchableOpacity
            onPress={() => setCurrentTab("Info")}
            style={[
              styles.tab,
              currentTab === "Info" && { backgroundColor: "#f1f1f1" },
            ]}
          >
            <Text style={styles.tabText}>Info</Text>
          </TouchableOpacity>
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
            onPress={() => setCurrentTab("Menu")}
            style={[
              styles.tab,
              currentTab === "Menu" && { backgroundColor: "#f1f1f1" },
            ]}
          >
            <Text style={styles.tabText}>Menu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherContent}>
          {currentTab === "Activity" && <Activity />}
          {currentTab === "Menu" && <MenuTab />}
          {currentTab === "Info" && <Info />}
        </View>
      </ScrollView>
    </View>
  );
};

export default Location;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 50,
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
    height: WIDTH * 0.8,
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
    marginVertical: 8,
  },
  fullname: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  other: {},
  badge: { flexDirection: "row", gap: 1, justifyContent: "flex-end" },
  followerCont: { flexDirection: "column", alignItems: "flex-end", gap: 8 },
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
    borderWidth: 0.5,
    borderColor: "white",
  },
  badgeImage: {
    width: 30,
    height: 30,
  },
  otherContent: {},
  info: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  tabcont: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 2,
    paddingHorizontal: 15,
    paddingTop: 15,
    borderBottomColor: "gray",
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
