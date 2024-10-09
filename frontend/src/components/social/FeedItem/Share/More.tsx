import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Divider, TextInput } from "react-native-paper";

const More = () => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 20,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Share
      </Text>
      <Divider style={{ marginBottom: 20 }} />
      <TextInput
        mode="outlined"
        placeholder="Search"
        left={<TextInput.Icon icon="magnify" />}
        outlineStyle={{ borderRadius: 50 }}
        style={{ height: 40, marginBottom: 20 }}
      />
      {[1, 2].map((item) => (
        <View
          key={item}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Image
            source={require("../../../../../assets/images/user1.png")}
            style={styles.avatar}
          />
          <Text style={{ fontSize: 16 }}>Username</Text>
        </View>
      ))}
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
