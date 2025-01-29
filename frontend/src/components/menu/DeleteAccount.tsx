import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { deleteAccountService } from "@/src/services/user";
import { useUser } from "@/src/context/User";

const DeleteAccount: React.FC<{ close: () => void }> = ({ close }) => {
  const { colors } = useTheme();
  const { addNotification } = useToastNotification();
  const { logout } = useUser();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteAccountService();
      addNotification({ message: res });
      logout();
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Ionicons name="trash-outline" size={20} color="#f00" />
      <View style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
        <Text style={{ fontSize: 12 }}>This Process is irreversible</Text>
        <Text style={{ fontSize: 16 }}>Proceed to delete your account</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 30 }}>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            flex: 1,
            flexDirection: "row",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <ActivityIndicator />}
          <Text style={{ color: colors.primary, fontSize: 16 }}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={close}
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
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
