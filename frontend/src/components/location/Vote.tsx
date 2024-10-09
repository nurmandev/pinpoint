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
import Button from "../Button";

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
  { label: "Answer", value: "answer" },
  { label: "Answer", value: "answer1" },
  { label: "Answer", value: "answer2" },
  { label: "Answer", value: "answer3" },
];
const Vote: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{ borderWidth: 2, padding: 2, borderRadius: 5 }}
      >
        <Ionicons name="stats-chart" size={20} />
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
            <View style={{ marginBottom: 20, alignItems: "flex-end" }}>
              <AntDesign
                name="closecircleo"
                size={24}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <Text style={styles.info}>
              Lorem ipsum dolor sit amet, onsectetur hd adipiscing elit, eiusmod
              temposed do.?
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
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Image
                source={require("../../../assets/images/user1.png")}
                style={{ height: 15, width: 15, borderRadius: 20 }}
              />
              <Text style={{ fontSize: 12, color: "gray" }}>24 votes</Text>
            </View>
            <Button
              onPress={() => setIsModalVisible(false)}
              containerStyle={{ marginTop: 25 }}
              variant="contained"
            >
              Vote
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
  info: { fontWeight: "500", fontSize: 18 },
  option: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Vote;
