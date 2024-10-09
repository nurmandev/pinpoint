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

type Option = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  placeholder?: string;
  selectedValue?: string | number;
  onValueChange: (value: string | number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  optionStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
};

const options = [
  { label: "Reason 1", value: "answer" },
  { label: "Reason 2", value: "answer1" },
  { label: "Reason 3", value: "answer2" },
  { label: "Reason 4", value: "answer3" },
];
const Delete: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <Ionicons name="close-circle-outline" size={20} />
        <Text>Delete Inquiry</Text>
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
                Delete Inquiry
              </Text>
              <AntDesign
                name="close"
                size={24}
                color={"gray"}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <Text style={styles.info}>
              Select a reason for deleting this inquiry
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
});

export default Delete;
