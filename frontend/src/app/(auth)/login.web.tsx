import Button from "@/src/components/Button";
import Carousel from "@/src/components/onboarding/Carousel";
import { useAuth } from "@/src/context/Auth";
import { useUser } from "@/src/context/User";
import { lightColors } from "@/src/utils/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";

const Login = () => {
  const { login } = useAuth();
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { width: WIDTH } = useWindowDimensions();
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
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
      await login(email.trim().toLowerCase(), password, "partner");
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

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.leftContainer,
          {
            width: WIDTH > 768 ? "40%" : "100%",
            padding: WIDTH > 768 ? 40 : 0,
          },
        ]}
      >
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

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          error={!!error.email}
        />
        {!!error.email && <Text style={styles.error}>{error.email}</Text>}

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            />
          }
          error={!!error.password}
        />
        {!!error.password && <Text style={styles.error}>{error.password}</Text>}

        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.rememberMeContainer}
        >
          <Checkbox status={rememberMe ? "checked" : "unchecked"} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
        {!!error.general && (
          <Text style={[styles.error, { marginTop: 0 }]}>{error.general}</Text>
        )}

        <Button
          loading={loading}
          onPress={() => handleLogin()}
          variant="contained"
        >
          Sign In
        </Button>

        <Text style={styles.forgotPassword} onPress={() => router.push("/")}>
          Forgot Password?
        </Text>
        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/register")}
            style={styles.signUpLink}
          >
            Sign Up
          </Text>
        </Text>
      </View>

      {WIDTH > 768 && (
        <View style={styles.rightContainer}>
          <Carousel />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  leftContainer: {
    justifyContent: "center",
    // padding: 40,
  },
  rightContainer: {
    width: "55%",
    padding: 20,
    justifyContent: "center",
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
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    height: 50,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    color: lightColors.colors.primary,
    textAlign: "right",
  },
  signUpText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
  signUpLink: {
    fontWeight: "bold",
    color: lightColors.colors.primary,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: -20,
  },
});

export default Login;
