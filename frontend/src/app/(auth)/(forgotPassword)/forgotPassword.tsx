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
import { requestForgotPasswordCodeSerrvice } from "@/src/services/auth";
import { router } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState({ email: "", general: "" });
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email are required." }));
      return false;
    }

    setError({ email: "", general: "" });
    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      await requestForgotPasswordCodeSerrvice(email.trim().toLowerCase());
      router.push({
        pathname: "/verifyToken",
        params: { email: email.toLowerCase() },
      });
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          error={error.email}
        />

        {error.general ? (
          <Text style={{ color: "red", marginBottom: 5 }}>{error.general}</Text>
        ) : null}
        <Button
          onPress={handleForgotPassword}
          variant="contained"
          loading={loading}
        >
          Reset Password
        </Button>
      </View>
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
