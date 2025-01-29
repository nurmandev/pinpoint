import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { resetForgotPasswordCodeSerrvice } from "@/src/services/auth";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import ResetModal from "@/src/components/auth/PasswordReset";

const ForgotPassword = () => {
  const { email, otp } = useLocalSearchParams();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({
    confirmPassword: "",
    password: "",
    general: "",
  });
  console.log(email, otp);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password are required." }));
      return false;
    }
    if (!confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm your password.",
      }));
      return false;
    }

    if (confirmPassword !== password) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password do not match",
      }));
      return false;
    }

    setError({ confirmPassword: "", password: "", general: "" });
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      await resetForgotPasswordCodeSerrvice(
        email as string,
        otp as string,
        confirmPassword.trim().toLowerCase()
      );
      setShowModal(true);
    } catch (error: any) {
      console.log(error);
      setError((prev) => ({
        ...prev,
        general: error.message || "ForgotPassword failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome back</Text>
        <Text style={styles.header}>to The Pinpoint Social!</Text>
        <Text style={styles.description}>Reset your password</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <TextInput
          placeholder="Password"
          isPassword
          value={password}
          onChangeText={setPassword}
          error={error.password}
        />

        <TextInput
          placeholder="Confirm Password"
          isPassword
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={error.confirmPassword}
        />

        {error.general ? (
          <Text style={{ color: "red", marginBottom: 5 }}>{error.general}</Text>
        ) : null}
        <Button
          onPress={handleResetPassword}
          variant="contained"
          loading={loading}
        >
          Reset Password
        </Button>
      </View>
      <ResetModal visible={showModal} onClose={() => setShowModal(false)} />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  error: {
    color: "red", // Adjust color as needed
    marginBottom: 10,
  },
});
