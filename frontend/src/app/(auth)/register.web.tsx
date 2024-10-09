import Button from "@/src/components/Button";
import Carousel from "@/src/components/onboarding/Carousel";
import Select from "@/src/components/Select";
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
  ScrollView,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "@/src/context/Auth";

const businessType = [
  { label: "I sell Products", value: "products" },
  { label: "I sell Services", value: "services" },
  { label: "i sell Products & Services", value: "products & services" },
];

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { width: WIDTH } = useWindowDimensions();
  const [city, setCity] = useState<string | number>("");

  return (
    <View style={styles.container}>
      {WIDTH > 768 && (
        <View style={styles.rightContainer}>
          <Carousel />
        </View>
      )}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            mode="outlined"
            label="Bussiness Legal Name"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Username"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="First Name"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Last Name"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <TextInput
            mode="outlined"
            label="Bussiness Physical Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Suite/Bldg"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <View style={styles.row}>
            <Select
              placeholder="State"
              options={[]}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
              containerStyle={styles.selectContainerStyle}
            />
            <Select
              placeholder="City"
              options={[]}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
              containerStyle={styles.selectContainerStyle}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Zip Code"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <Select
              placeholder="EIN/SSN"
              options={[]}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
              containerStyle={styles.selectContainerStyle}
            />
          </View>
          <Select
            placeholder="Business Type"
            options={businessType}
            selectedValue={city}
            onValueChange={(value) => setCity(value)}
            containerStyle={styles.selectContainerStyle}
          />
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
          <TextInput
            mode="outlined"
            label="Confirm Password"
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
            Sign Up
          </Button>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Text onPress={() => router.push("/login")} style={styles.signUpText}>
            Already have an account?{" "}
            <Text style={styles.signUpLink}>Sign In</Text>
          </Text>
        </ScrollView>
      </View>
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
    color: lightColors.colors.primary,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  selectContainerStyle: {
    marginBottom: 20,
    backgroundColor: "transparent",
    borderColor: "black",
    borderRadius: 5,
    flex: 1,
    height: 50,
  },
});

export default Login;
