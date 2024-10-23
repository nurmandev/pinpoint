import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { IProduct } from "@/src/types/product";
import { IService } from "@/src/types/service";
import { imageURL } from "@/src/services/api";

const Favourites = () => {
  const { colors } = useTheme();
  const [favorites, setFavorites] = useState<IService[]>([]);
  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      {favorites.length <= 0 ? (
        <Text>No Favourites</Text>
      ) : (
        favorites.map((favourite) => (
          <View
            key={favourite._id}
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
                  source={{ uri: imageURL + favourite.images[0] }}
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
                  style={{
                    fontSize: 18,
                    fontWeight: "medium",
                    marginBottom: 5,
                  }}
                >
                  {favourite.name}
                </Text>
                <Text>{favourite.description}</Text>
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
                <Text>{favourite.location[0].address}</Text>
              </View>
              <Text style={{ fontWeight: "bold", color: colors.primary }}>
                Remove
              </Text>
            </View>
          </View>
        ))
      )}
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
