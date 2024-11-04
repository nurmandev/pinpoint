import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { Link, Redirect } from "expo-router";
import { Checkbox, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "@/src/context/Auth";
import { useUser } from "@/src/context/User";

enum Tabs {
  User = "User",
  Partner = "Partner",
  Assistant = "Assistant",
}

const Login = () => {
  const { login } = useAuth();
  const { user } = useUser();
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.User);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (currentTab === Tabs.Partner) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [user]);

  const validateInput = () => {
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email are required." }));
      return false;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: "Password are required." }));
      return false;
    }
    setError({ email: "", password: "", general: "" });
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      await login(
        email,
        password,
        currentTab === "User" ? "customer" : "partner"
      );
    } catch (error: any) {
      console.log(error);
      setError((prev) => ({
        ...prev,
        general: error || "Login failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderCommonForm = () => (
    <>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={error.email}
      />
      <TextInput
        placeholder="Password"
        isPassword
        value={password}
        onChangeText={setPassword}
        error={error.password}
      />
      <View style={styles.options}>
        <View style={styles.remember}>
          <Checkbox.Android
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />
          <Text>Remember me</Text>
        </View>
        <Link
          style={[styles.forgetPassword, { color: colors.primary }]}
          href={"/"}
        >
          Forgot Password
        </Link>
      </View>
      {error.general ? (
        <Text style={{ color: "red", marginBottom: 5 }}>{error.general}</Text>
      ) : null}
      <Button onPress={handleLogin} variant="contained" loading={loading}>
        Sign In
      </Button>
      <View style={[styles.remember, styles.signupContainer]}>
        <Text>Don't have an account?</Text>
        <Link href={"/register"} style={styles.signup}>
          Sign up
        </Link>
      </View>
    </>
  );

  const renderForm = () => {
    switch (currentTab) {
      case Tabs.User:
      case Tabs.Partner:
        return renderCommonForm();
      case Tabs.Assistant:
        return (
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Email" />
            <Button containerStyle={{ marginTop: 25 }} variant="contained">
              Verify
            </Button>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome back</Text>
        <Text style={styles.header}>to The Pinpoint Social!</Text>
        <Text style={styles.description}>Sign in to access your account</Text>
      </View>
      <View style={styles.tabContainer}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.User)}
            variant={currentTab === Tabs.User ? "contained" : "outlined"}
          >
            As a User
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.Partner)}
            variant={currentTab === Tabs.Partner ? "contained" : "outlined"}
          >
            As a Partner
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.Assistant)}
            variant={currentTab === Tabs.Assistant ? "contained" : "outlined"}
          >
            Assistant
          </Button>
        </View>
      </View>
      {renderForm()}
    </SafeAreaView>
  );
};

export default Login;

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
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgetPassword: {
    fontSize: 14,
    fontWeight: "bold",
  },
  signupContainer: {
    justifyContent: "center",
    marginTop: 15,
  },
  signup: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  error: {
    color: "red", // Adjust color as needed
    marginBottom: 10,
  },
});
