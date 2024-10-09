import React, { useState } from "react";
import {
  TextInput as DefaultTextInput,
  StyleSheet,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed or use another icon library

type CustomTextInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
  isPassword?: boolean;
};

const TextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  inputStyle,
  error,
  isPassword = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <DefaultTextInput
          style={[styles.input, inputStyle, error ? styles.errorInput : null]}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor="#2F2F2F"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 18,
    color: "#2F2F2F",
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  errorInput: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 4,
    fontSize: 14,
  },
});

export default TextInput;
