import { FlatList, StyleSheet, Platform, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useDimensions from "@/src/hooks/useDimension";

const data: any = [
  // { id: "1", earned: true },
  // { id: "2", earned: false },
  // { id: "3", earned: false },
  // { id: "4", earned: false },
];

const Badges = () => {
  const { width: WIDTH } = useDimensions();
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#e1e1e1",
          borderRadius: 8,
          padding: 10,
          marginRight: 15,
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
    <View style={{ padding: 15, flex: 1 }}>
      <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "600" }}>
        Leads Badges
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 15 }}
      />
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({});
