import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons"; // You can also use other icon libraries
import { usePathname } from "expo-router";
import { Link } from "expo-router";
import { lightColors } from "../../utils/colors";
import { Href } from "expo-router";
import { useTheme } from "react-native-paper";

export const navList: {
  name: string;
  icon: string;
  iconType?: any;
  path: Href<string>;
}[] = [
  {
    name: "Dashboard",
    icon: "home",
    iconType: Feather,
    path: "/dashboard",
  },
  {
    name: "Leads",
    icon: "clipboard-edit-outline",
    iconType: MaterialCommunityIcons,
    path: "/leads",
  },
  {
    name: "Location",
    icon: "location-outline",
    iconType: Ionicons,
    path: "/locations",
  },
  {
    name: "Products",
    icon: "bag-handle-outline",
    iconType: Ionicons,
    path: "/products",
  },
  {
    name: "Services",
    icon: "user",
    iconType: FontAwesome5,
    path: "/services",
  },
  {
    name: "Coupons",
    icon: "ticket-percent-outline",
    iconType: MaterialCommunityIcons,
    path: "/coupons",
  },
  {
    name: "Badges",
    icon: "shield-star-outline",
    iconType: MaterialCommunityIcons,
    path: "/badges",
  },
  {
    name: "Polls",
    icon: "chart",
    iconType: SimpleLineIcons,
    path: "/polls",
  },
  {
    name: "Pinpoint Social",
    icon: "location-outline",
    iconType: Ionicons,
    path: "/socials",
  },
  {
    name: "Pinpoint Partnership",
    icon: "diamond",
    iconType: FontAwesome,
    path: "/partnership",
  },
  {
    name: "Settings",
    icon: "settings-outline",
    iconType: Ionicons,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sidebarWidth] = useState(new Animated.Value(60)); // Initial sidebar width
  const pathname = usePathname();
  const { colors } = useTheme();

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: isCollapsed ? 250 : 80, // Expanded width or collapsed width
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    toggleSidebar();
  }, []);

  return (
    <Animated.View style={[styles.sidebarContainer, { width: sidebarWidth }]}>
      <View style={styles.logoContainer}>
        {!isCollapsed ? (
          <Image
            source={require("../../../assets/images/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../../assets/images/logo1.png")}
            style={[styles.logo, { height: 35, width: 30, marginTop: 10 }]}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.menuItems}>
        {navList.map((item, index) => {
          const isActive = pathname === item.path; // Check if current path matches the link
          return (
            <Link
              href={item.path}
              key={index}
              style={{ textDecorationLine: "none" }}
            >
              <View
                style={[
                  styles.menuItem,
                  isActive ? styles.activeItem : null, // Apply active styles
                ]}
              >
                {item.name !== "Pinpoint Social" ? (
                  <item.iconType
                    name={item.icon}
                    size={20}
                    color={isActive ? "white" : colors.primary}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/images/logo_gray.png")}
                    style={[{ height: 24, width: 24 }]}
                    resizeMode="contain"
                  />
                )}
                {!isCollapsed && (
                  <Text
                    style={[
                      styles.menuText,
                      { color: isActive ? "white" : colors.primary },
                    ]}
                  >
                    {item.name}
                  </Text>
                )}
              </View>
            </Link>
          );
        })}
      </View>

      {/* Toggle button */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.collapseButton}>
        <Feather
          name={isCollapsed ? "chevrons-right" : "chevrons-left"}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flexDirection: "column",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 20,
  },
  logoContainer: {},

  logo: {
    width: 120,
    height: 50,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 5,
    width: "100%",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "gray",
  },
  collapseButton: {
    position: "absolute",
    top: 20,
    right: 5,
  },
  activeItem: {
    backgroundColor: lightColors.colors.primary, // Light blue background for active item
    borderRadius: 5,
  },
});

export default Sidebar;
