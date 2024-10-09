import { Stack, Tabs, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Image } from "react-native";
import useDimensions from "@/src/hooks/useDimension";
import { Appbar, Menu } from "react-native-paper";
import AddPost from "../../../(socialpost)/addpost";
import { useState } from "react";
import Modal from "@/src/components/modals/modal";

export default function TabLayout() {
  const { isMobile } = useDimensions();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return isMobile ? (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hides the text labels
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? color : "transparent", // Background for selected icon
                padding: 8,
                paddingHorizontal: 15,
                borderRadius: 50, // Makes it round
              }}
            >
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? "white" : color}
              />
            </View>
          ),
          header: ({ navigation }) => (
            <Appbar.Header mode="small" style={{ backgroundColor: "white" }}>
              <Appbar.Action
                icon="menu"
                onPress={() => navigation.toggleDrawer()} // Toggle the drawer
                color="black"
              />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../../../../../assets/images/logo2.png")}
                  style={{ width: 150, height: 40 }}
                  resizeMode="contain"
                />
              </View>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action
                    icon="plus-circle-outline"
                    onPress={openMenu}
                  />
                }
                anchorPosition="bottom"
                mode="flat"
              >
                <Modal
                  button={
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        router.push("/addpost");
                      }}
                      leadingIcon="pencil-outline"
                      title="Create Post"
                    />
                  }
                >
                  <AddPost />
                </Modal>
                <Menu.Item
                  leadingIcon="movie-open-play-outline"
                  onPress={() => {
                    closeMenu();
                    router.push("/camera");
                  }}
                  title="Create Story"
                />
                <Menu.Item
                  leadingIcon="cube-outline"
                  onPress={() => {
                    closeMenu();
                    router.push("/products/add");
                  }}
                  title="Add Product"
                />
                <Menu.Item
                  leadingIcon="account-outline"
                  onPress={() => {
                    closeMenu();
                    router.push("/services/add");
                  }}
                  title="Add Service"
                />
                <Menu.Item
                  leadingIcon="map-marker-outline"
                  onPress={() => {
                    closeMenu();
                    router.push("/locations/setup");
                  }}
                  title="Add Location"
                />
              </Menu>
            </Appbar.Header>
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? color : "transparent", // Background for selected icon
                padding: 8,
                paddingHorizontal: 15,
                borderRadius: 50, // Makes it round
              }}
            >
              <Ionicons
                name="mail-outline"
                size={24}
                color={focused ? "white" : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? color : "transparent", // Background for selected icon
                padding: 8,
                paddingHorizontal: 15,
                borderRadius: 50, // Makes it round
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={focused ? "white" : color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="message" />
      <Stack.Screen name="notification" />
    </Stack>
  );
}
