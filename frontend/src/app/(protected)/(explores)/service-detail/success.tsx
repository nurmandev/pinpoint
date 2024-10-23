import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Success = () => {
  const { name, id } = useLocalSearchParams();
  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 20,
      }}
    >
      <Ionicons
        name="checkmark-circle-outline"
        size={60}
        color={colors.primary}
      />
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 40 }}>
        Request Submitted to
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 30 }}>
        {name}
      </Text>
      <Button onPress={() => router.push(`/inquiry/${id}`)}>
        View Inquiry
      </Button>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
