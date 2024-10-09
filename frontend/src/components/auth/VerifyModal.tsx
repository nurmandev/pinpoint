import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../Button";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { useUser } from "@/src/context/User";
import { UserRole } from "@/src/types/user";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const VerifyModal: React.FC<Props> = ({ visible, onClose }) => {
  const { user } = useUser();
  const { colors } = useTheme();
  const handleLogin = () => {
    onClose();
    if (user?.role === UserRole.PARTNER) {
      router.navigate("/dashboard");
    } else {
      router.navigate("/");
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            name="checkmark-circle"
            type="font-awesome"
            color={colors.primary}
            size={80}
            containerStyle={styles.icon}
          />
          <Text style={styles.modalText}>Verification Successful!</Text>
          <Text style={styles.subText}>
            Congratulation, You have successfully verify your account
          </Text>

          <Button onPress={handleLogin}>Continue</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default VerifyModal;
