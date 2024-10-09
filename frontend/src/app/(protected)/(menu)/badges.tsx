import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
  { id: "1", earned: true },
  { id: "2", earned: false },
  { id: "3", earned: false },
  { id: "4", earned: false },
];

const WIDTH = Dimensions.get("screen").width;
const Badges = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#e1e1e1",
          borderRadius: 8,
          padding: 10,
        }}
      >
        <MaterialCommunityIcons
          name="shield-star-outline"
          size={60}
          color={item.earned ? "#CD7F32" : "#e1e1e1"}
        />
        <View>
          <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "500" }}>
            Tier {item.id}
          </Text>
          <Text
            style={{
              color: "gray",
              textAlign: "center",
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Check - In {item.id} time
            {!item.earned ? <Text> to earn the badge</Text> : null}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Badges" />
      </Appbar.Header>
      <View style={{ padding: 15, flex: 1 }}>
        <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}>
          Check - In
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // numColumns={2}
          contentContainerStyle={{ gap: 15 }}
        />
      </View>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({});
