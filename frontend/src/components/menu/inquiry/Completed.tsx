import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Menu } from "react-native-paper";
import Rating from "../../Rating";

const data = [1, 2, 3];

interface Props {}
const Completed: React.FC<Props> = () => {
  return (
    <View style={styles.section}>
      <View style={{ marginTop: 10 }}>
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => router.push("/inquiry/detail")}
            style={styles.card}
            key={item}
          >
            <Image
              source={require("../../../../assets/images/product.png")}
              style={styles.image}
            />
            <View style={styles.rightSection}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.name}>Service Name</Text>
                <Text style={{ color: "green", fontWeight: "bold" }}>
                  Completed
                </Text>
              </View>

              <Text style={{}}>Location Name</Text>
              <Text style={{}}>
                Lorem ipsum dolor sit amet, consectetur adipisci...
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{}}>07/12/24, 09:00pm </Text>
                <Rating rating={5} show={false} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  section: {},
  sectionName: { fontSize: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingBottom: 15,
    marginBottom: 15,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  rightSection: { gap: 5 },
  name: { fontSize: 16, fontWeight: "500" },
  optionButton: { position: "absolute", top: 5, right: 15 },
});
