import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import useDimensions from "@/src/hooks/useDimension";

const notification = () => {
  const { isMobile } = useDimensions();
  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        {router.canGoBack() && isMobile && (
          <Appbar.BackAction onPress={() => router.back()} />
        )}
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <FlatList
        data={["1", "2", "3", "4", "5"]}
        renderItem={() => (
          <View style={styles.item}>
            <Image
              source={require("../../../../assets/images/feeds/feed2.png")}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Cody Dixon likes your post</Text>
              <Text style={styles.date}>9:21am</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} />
          </View>
        )}
        keyExtractor={(Item) => Item}
        style={{ padding: 15 }}
        contentContainerStyle={{ gap: 15 }}
      />
    </>
  );
};

export default notification;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingVertical: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 30 },
  text: { fontWeight: "500" },
  date: {},
});
