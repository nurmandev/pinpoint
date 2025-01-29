import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Button from "@/src/components/Button";
import { ActivityIndicator, useTheme } from "react-native-paper";
import {
  requestForgotPasswordCodeSerrvice,
  verifyTokenSerrvice,
} from "@/src/services/auth";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

const OTPVerification = () => {
  const { colors } = useTheme();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingMail, setSendingMail] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const isValidOtp = () => otp.length === 6 && /^\d{6}$/.test(otp);

  const handleVerify = async () => {
    if (!isValidOtp()) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError(null);
    if (!email) return;

    try {
      setLoading(true);
      await verifyTokenSerrvice(email.toString().toLowerCase(), otp);
      router.push({
        pathname: "/(auth)/(forgotPassword)/resetPassword",
        params: { email, otp },
      });
    } catch (error: any) {
      setError(
        error.message ||
          "An error occurred during verification. Please try again."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (!email) return;
      requestForgotPasswordCodeSerrvice(email as string);
    } catch (error: any) {
      setError(error.message);
    }
  }, [email]);

  const handleResend = async () => {
    // Simulate OTP resend
    if (!email) return;
    try {
      setSendingMail(true);
      await requestForgotPasswordCodeSerrvice(email as string);
      console.log("OTP resent.");
    } catch (error) {
    } finally {
      setSendingMail(false);
    }
  };

  const handleChangeText = (text: string, index: number) => {
    const otpArr = otp.split("");
    otpArr[index] = text;
    setOtp(otpArr.join(""));

    // Move to next input field
    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Move to previous input field
    if (key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Verify Token</Text>
        <Text style={styles.description}>
          Enter the Verification Code that has been sent to your registered
          email address
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            style={styles.otpInput}
            key={index}
            keyboardType="numeric"
            placeholder="_"
            placeholderTextColor={"#2F2F2F"}
            maxLength={1}
            ref={(ref: TextInput) => (inputRefs.current[index] = ref!)}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            value={otp[index] || ""}
          />
        ))}
      </View>
      <View style={styles.resendContainer}>
        {sendingMail ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
            <Text style={[styles.resendText, { color: colors.primary }]}>
              Resend Code
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button loading={loading} onPress={handleVerify}>
        Verify
      </Button>
    </SafeAreaView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#F1F1F1",
  },
  errorText: { color: "red", marginBottom: 5 },
  resendButton: {
    marginTop: 20,
  },
  resendContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupContainer: {
    justifyContent: "center",
    marginTop: 15,
  },
  signup: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
