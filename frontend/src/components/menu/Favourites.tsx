import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const Favourites = () => {
  const { colors } = useTheme();
  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#f1f1f1",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <View style={styles.itemcont}>
            <View style={{}}>
              <Image
                source={require("../../../assets/images/feeds/feed1.png")}
                style={styles.image}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -5,
                  right: -5,
                  backgroundColor: "green",
                  width: 10,
                  height: 10,
                  borderRadius: 20,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "medium", marginBottom: 5 }}
              >
                Yori house, Rivers Street
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do
                eiusmod mpor incididunt ut labore et dolore magn...
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 13,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="location-outline" size={24} />
              <Text>Yori house, Rivers Street</Text>
            </View>
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
              Remove
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  itemcont: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  image: { height: 100, width: 100, borderRadius: 5 },
});
