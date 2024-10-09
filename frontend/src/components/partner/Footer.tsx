import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const Footer = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "gray" }}>
          Pinpoint 2024 ©- All Rights Reserved
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Privacy Policy
        </Text>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Disclaimer
        </Text>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Terms of Use
        </Text>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Support
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    zIndex: 20,
    backgroundColor: "#f5f5f5",
  },
});
