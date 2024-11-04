import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { ActivityIndicator, Menu } from "react-native-paper";
import Rating from "@/src/components/Rating";
import Button from "@/src/components/Button";
import Info from "@/src/components/location/Info";
import Activity from "@/src/components/Activity";
import Vote from "@/src/components/location/Vote";
import MenuTab from "@/src/components/location/Menu";
import { useLocation } from "@/src/context/Location";
import { Location as ILocation } from "@/src/types/location";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { imageURL } from "@/src/services/api";
import { useUser } from "@/src/context/User";
import { fetchServicesForLocation } from "@/src/services/service";
import { fetchProductsForLocation } from "@/src/services/product";
import { IProduct } from "@/src/types/product";
import { IService } from "@/src/types/service";
import { Post } from "@/src/types/post";
import { fetchContentsByLocation } from "@/src/services/content";

const Location = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const { loadLocationById } = useLocation();
  const { addNotification } = useToastNotification();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [currentTab, setCurrentTab] = useState("Info");
  const [visible, setVisible] = React.useState(false);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!id) return;
        setLoadingPost(true);
        const postsData = await fetchContentsByLocation(id as string);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPosts();
  }, [id]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const location = await loadLocationById(id as string);
        setLocation(location);
        setLoading(false);
      } catch (error: any) {
        addNotification(error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const getServices = async () => {
      if (!location?._id) return;
      try {
        const result = await fetchServicesForLocation(location?._id);
        setServices(result);
      } catch (error: any) {
        addNotification(error);
      }
    };

    const getProducts = async () => {
      try {
        if (!location?._id) return;
        const result = await fetchProductsForLocation(location?._id);
        setProducts(result);
      } catch (error: any) {
        addNotification(error);
      }
    };

    getServices();
    getProducts();
  }, [location?._id]);
  console.log(products, services);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={loading ? "black" : "white"}
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
      {loading ? (
        <ActivityIndicator style={{ marginTop: 100 }} />
      ) : (
        <ScrollView>
          <View style={styles.selectedItem}>
            <Image
              source={{ uri: imageURL + location?.images[0] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <View style={styles.userDetail}>
              <View style={styles.name}>
                <Text style={styles.username}>
                  @{location?.partnerId.username}
                </Text>
                <Text style={styles.fullname}>{location?.locationName}</Text>
                <Rating rating={location?.rating || 0} />
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "300" }}>
                    {location?.reviews?.length} reviews
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.other}>
                <View style={styles.followerCont}>
                  <View style={styles.followers}>
                    <Text style={styles.followersText}>
                      {location?.followers?.length} Followers
                    </Text>
                  </View>
                  {location?.images && location?.images?.length > 1 && (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({ pathname: "/location/pictures" })
                      }
                      style={styles.otherpics}
                    >
                      <BlurView
                        intensity={100}
                        tint="dark"
                        style={styles.mainImage}
                      >
                        <Image
                          source={{ uri: imageURL + location.images[1] }}
                          style={styles.mainImage}
                          resizeMode="cover"
                        />
                      </BlurView>
                      <Text style={[styles.username, { position: "absolute" }]}>
                        +{location.images.length - 1}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.info}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 5 }}>
                <Text style={{ color: "#07d64c", fontWeight: "bold" }}>
                  Open
                </Text>{" "}
                till 5:00pm
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                {location?.address}
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
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
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
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
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
                // height: 110,
              }}
            >
              <View style={{ flex: 1 }}>
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
                <Ionicons
                  name={
                    user && location?.likes.includes(user?._id)
                      ? "heart"
                      : "heart-outline"
                  }
                  color={
                    user && location?.likes.includes(user?._id)
                      ? "red"
                      : "black"
                  }
                  size={28}
                />
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
            {currentTab === "Activity" && (
              <Activity loading={loadingPost} posts={posts} />
            )}
            {currentTab === "Menu" && (
              <MenuTab products={products} services={services} />
            )}
            {currentTab === "Info" && (
              <Info
                location={location}
                products={{
                  loading: false,
                  products: products,
                }}
                services={{
                  loading: false,
                  services: services,
                }}
              />
            )}
          </View>
        </ScrollView>
      )}
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
    backgroundColor: "black",
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
