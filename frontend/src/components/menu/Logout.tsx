import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useUser } from "@/src/context/User";

const Logout: React.FC<{ close: () => void }> = ({ close }) => {
  const { colors } = useTheme();
  const { logout } = useUser();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Ionicons name="log-out-outline" size={20} color="#555" />
      <Text style={{ fontSize: 16 }}>Proceed to log out</Text>
      <View style={{ flexDirection: "row", gap: 30 }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            flex: 1,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={logout}
        >
          <Text style={{ color: colors.primary, fontSize: 16 }}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#f00",
            backgroundColor: "#f00",
            padding: 10,
            flex: 1,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={close}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
