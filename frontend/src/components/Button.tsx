import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import { lightColors } from "../utils/colors";
import { ActivityIndicator } from "react-native-paper";

type ButtonVariant = "contained" | "outlined";

type CustomButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
};

const Button: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  containerStyle,
  textStyle,
  loading = false,
  disabled = false,
  variant = "contained",
}) => {
  const isOutlined = variant === "outlined";
  const isTextChild =
    typeof children === "string" || typeof children === "number";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutlined ? styles.outlinedButton : styles.containedButton,
        disabled && styles.disabledButton,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size={15}
          color={isOutlined ? lightColors.colors.primary : "#fff"}
          style={styles.loader}
        />
      )}
      {isTextChild ? (
        <Text
          style={[
            styles.buttonText,
            isOutlined ? styles.outlinedText : styles.containedText,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        <View style={styles.childrenContainer}>{children}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    maxHeight: 48,
    flexDirection: "row",
  },
  containedButton: {
    backgroundColor: lightColors.colors.primary,
    borderColor: lightColors.colors.primary,
  },
  outlinedButton: {
    backgroundColor: "#f1f1f1",
    borderColor: "#D8D8D8",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  containedText: {
    color: "#ffffff",
  },
  outlinedText: {
    color: "gray",
  },
  loader: {
    marginRight: 8,
  },
  childrenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
