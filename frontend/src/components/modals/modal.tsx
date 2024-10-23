import useDimensions from "@/src/hooks/useDimension";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, ReactNode, ReactElement } from "react";
import {
  Modal as DefaultModal,
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native";

type CustomModalProps = {
  children: (onClose: () => void) => ReactNode; // Passing onClose to children
  button: ReactNode;
  buttonStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
};

const Modal: React.FC<CustomModalProps> = ({
  button,
  children,
  modalStyle,
  buttonStyle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isMobile } = useDimensions();

  const handleClose = () => setIsModalVisible(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[buttonStyle]}
      >
        {button}
      </TouchableOpacity>

      <DefaultModal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          // onPressOut={handleClose}
        >
          <View
            style={[
              styles.modalContent,
              { width: isMobile ? "90%" : "40%" },
              modalStyle,
            ]}
          >
            <Ionicons
              name="close"
              size={20}
              style={styles.close}
              onPress={handleClose}
            />
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {children(handleClose)}
            {/* </ScrollView> */}
          </View>
        </TouchableOpacity>
      </DefaultModal>
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
    maxHeight: "90%",
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
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Modal;
