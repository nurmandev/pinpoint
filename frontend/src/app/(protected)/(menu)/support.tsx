import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const support = () => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Support" />
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#e1e1e1",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            gap: 10,
            marginTop: 30,
          }}
        >
          <MaterialIcons name="support-agent" size={24} />
          <Text style={{ fontSize: 16 }}>Chat with our support Agent</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default support;

const styles = StyleSheet.create({});
