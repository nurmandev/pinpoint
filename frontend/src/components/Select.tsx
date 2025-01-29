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
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Replace this with your preferred icon library

type Option = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  options: Option[];
  placeholder?: string;
  error?: string;
  selectedValue?: string | number;
  onValueChange: (value: string | number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  optionStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
};

const Select: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  selectedValue,
  error,
  onValueChange,
  containerStyle,
  inputStyle,
  optionStyle,
  modalStyle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[styles.input, inputStyle]}>
          {options.find(
            (option) =>
              `${option.value}`.toLowerCase() ===
              `${selectedValue}`.toLowerCase()
          )?.label || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#888" />
        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: 15,
              position: "absolute",
              bottom: -15,
            }}
          >
            {error}
          </Text>
        ) : null}
      </TouchableOpacity>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent, modalStyle]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[styles.optionText, optionStyle]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F1F1F1",
    paddingVertical: 10,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    maxHeight: "50%",
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Select;
