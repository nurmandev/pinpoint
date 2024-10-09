import React, { useState, ReactNode } from "react";
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import Button from "../Button";

type Option = {
  label: string;
  value: string | number;
};

type MultiSelectProps = {
  placeholder?: string;
  selectedValues?: (string | number)[];
  onValuesChange: (values: (string | number)[]) => void;
  options: Option[];
  button?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  optionStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  modalText?: string;
  buttonText?: string;
  modalTitle?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder = "Select...",
  selectedValues = [],
  onValuesChange,
  options,
  button,
  containerStyle,
  inputStyle,
  optionStyle,
  modalStyle,
  modalText,
  buttonText,
  modalTitle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localSelectedValues, setLocalSelectedValues] =
    useState<(string | number)[]>(selectedValues);

  const handleToggleValue = (value: string | number) => {
    const newSelectedValues = localSelectedValues.includes(value)
      ? localSelectedValues.filter((v) => v !== value)
      : [...localSelectedValues, value];

    setLocalSelectedValues(newSelectedValues);
  };

  const handleConfirmSelection = () => {
    onValuesChange(localSelectedValues);
    setIsModalVisible(false);
  };

  const selectedLabel = localSelectedValues
    .map(
      (value) => options.find((option) => option.value === value)?.label || ""
    )
    .join(", ");

  return (
    <>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => setIsModalVisible(true)}
      >
        {button ? (
          button
        ) : (
          <>
            <Text style={[styles.input, inputStyle]}>
              {selectedLabel || placeholder}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#888" />
          </>
        )}
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
          <View style={[styles.modalContent, modalStyle]}>
            <View
              style={{
                marginBottom: 20,
                alignItems: "flex-end",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View />
              {modalTitle && (
                <Text style={{ fontWeight: "500", fontSize: 24 }}>
                  {modalTitle}
                </Text>
              )}
              <AntDesign
                name="closecircleo"
                size={24}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            {modalText && <Text style={styles.info}>{modalText}</Text>}
            <View>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.option, optionStyle]}
                    onPress={() => handleToggleValue(item.value)}
                  >
                    <Checkbox.Android
                      status={
                        localSelectedValues.includes(item.value)
                          ? "checked"
                          : "unchecked"
                      }
                    />
                    <Text style={[styles.optionText]}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Button
              onPress={handleConfirmSelection}
              containerStyle={{ marginTop: 25 }}
              variant="contained"
            >
              {buttonText ? buttonText : "Confirm"}
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
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
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
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

export default MultiSelect;
