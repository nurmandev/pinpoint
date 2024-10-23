import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export interface PlaceRowProps {
  _id?: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

const PlaceRow: React.FC<PlaceRowProps> = ({ structured_formatting }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="location-outline" size={24} />
      </View>
      <View style={styles.details}>
        <Text style={styles.text1}>{structured_formatting?.main_text}</Text>
        <Text style={styles.text}>{structured_formatting?.secondary_text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text1: {
    fontSize: 18,
  },
  text: {
    fontSize: 13,
  },
  details: { backgroundColor: "transparent" },
});

export default PlaceRow;
