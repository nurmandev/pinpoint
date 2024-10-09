import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import { Ionicons, Feather } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import Location from "@/src/components/menu/favourites/Location";
import ProductService from "@/src/components/menu/favourites/ProductService";

const Favourites = () => {
  const { colors } = useTheme();
  const [selected, setSelected] = useState("Location");

  const getColor = (item: string) =>
    selected === item ? colors.primary : "black";
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Favorites" />
      </Appbar.Header>
      <View style={{ padding: 15, flex: 1 }}>
        <View style={styles.buttonGroup}>
          <Button
            variant="outlined"
            onPress={() => setSelected("Products & Service")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor:
                  selected === "Products & Service" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  {
                    color:
                      selected === "Products & Service"
                        ? colors.primary
                        : "black",
                  },
                ]}
              >
                Products & Service
              </Text>
            </View>
          </Button>
          <Button
            variant="outlined"
            onPress={() => setSelected("Location")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor: selected === "Location" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  { color: selected === "Location" ? colors.primary : "black" },
                ]}
              >
                Location
              </Text>
            </View>
          </Button>
        </View>
        {selected === "Products & Service" && <ProductService />}
        {selected === "Location" && <Location />}
      </View>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
  },
  itemButton: {
    backgroundColor: "white",
    flex: 1,
  },
  itemButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemButtonText: {
    fontSize: 20,
  },
});
