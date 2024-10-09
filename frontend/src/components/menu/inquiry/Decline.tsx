import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Replace this with your preferred icon library
import { Checkbox } from "react-native-paper";
import Button from "../../Button";

const options = [
  { label: "Reason 1", value: "answer" },
  { label: "Reason 2", value: "answer1" },
  { label: "Reason 3", value: "answer2" },
  { label: "Reason 4", value: "answer3" },
];
const Decline: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{ flex: 1 }}
      >
        <View style={styles.declineButton}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent]}>
            <View
              style={{
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Decline Ofer
              </Text>
              <AntDesign
                name="close"
                size={24}
                color={"gray"}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <Text style={styles.info}>
              Select a reason for declaring this offer
            </Text>
            <View>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Checkbox.Android
                      status={
                        selectedAnswer === item.value ? "checked" : "unchecked"
                      }
                    />
                    <Text style={[styles.optionText]}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Button
              onPress={() => setIsModalVisible(false)}
              containerStyle={{ marginTop: 15 }}
              variant="contained"
            >
              Submit
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    // maxHeight: "50%",
    // flex: 1,
  },
  info: { fontSize: 18 },
  option: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  declineButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
    flex: 1,
    marginRight: 5,
  },
  declineButtonText: {
    textAlign: "center",
  },
});

export default Decline;
