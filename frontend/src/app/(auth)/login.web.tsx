import Button from "@/src/components/Button";
import Carousel from "@/src/components/onboarding/Carousel";
import { useAuth } from "@/src/context/Auth";
import { lightColors } from "@/src/utils/colors";
import { router } from "expo-router";
import * as React from "react";
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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { width: WIDTH } = useWindowDimensions();

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
        />

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
        />

        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.rememberMeContainer}
        >
          <Checkbox status={rememberMe ? "checked" : "unchecked"} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        <Button onPress={() => login("partner")} variant="contained">
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
});

export default Login;
