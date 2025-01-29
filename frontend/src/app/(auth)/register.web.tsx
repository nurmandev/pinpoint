import Button from "@/src/components/Button";
import Carousel from "@/src/components/onboarding/Carousel";
import Select from "@/src/components/Select";
import { lightColors } from "@/src/utils/colors";
import { Link, router } from "expo-router";
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
import { UserRole } from "@/src/types/user";
import { RegistrationData } from "@/src/types/auth";
import { states } from "@/src/utils/country";

const businessType = [
  { label: "I sell Products", value: "products" },
  { label: "I sell Services", value: "services" },
  { label: "i sell Products & Services", value: "products & services" },
];

const Login = () => {
  const { register } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = React.useState(false);
  const { width: WIDTH } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    role: UserRole.PARTNER,
    businessLegalName: "",
    businessAddress: "",
    suite: "",
    zipCode: "",
    businessType: "",
    einSsn: "",
    confirmPassword: "",
    checked: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    role: "",
    businessLegalName: "",
    businessAddress: "",
    suite: "",
    zipCode: "",
    businessType: "",
    einSsn: "",
    confirmPassword: "",
    checked: "",
    general: "",
  });

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.businessLegalName)
      newErrors.businessLegalName = "Business Legal Name is required";
    if (!formData.businessAddress)
      newErrors.businessAddress = "Business Address is required";
    if (!formData.suite) newErrors.suite = "Suite is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!formData.businessType)
      newErrors.businessType = "Business Type is required";
    if (!formData.einSsn) newErrors.einSsn = "EIN/SSN is required";

    if (!formData.checked)
      newErrors.checked = "You must agree to the Terms and Conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        await register(formData as RegistrationData);
        setModalVisible(true);
      } catch (error: any) {
        if (Array.isArray(error)) {
          const errorObj: any = {};
          error.forEach((err) => {
            errorObj[err.path] = err.msg;
          });
          setErrors(errorObj);
          console.log(errorObj);
        } else {
          setErrors((prev) => ({ ...prev, general: error }));
          console.log("jjj", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(errors);

  const cities = formData.state
    ? states.find((state) => state.name === formData.state)?.cities
    : [];

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
            value={formData.businessLegalName}
            onChangeText={(text) =>
              handleInputChange("businessLegalName", text)
            }
            style={styles.input}
            error={!!errors.businessLegalName}
          />
          {!!errors.businessLegalName && (
            <Text style={[styles.error]}>{errors.businessLegalName}</Text>
          )}
          <TextInput
            mode="outlined"
            label="Username"
            value={formData.username}
            onChangeText={(text) => handleInputChange("username", text)}
            style={styles.input}
            error={!!errors.username}
          />
          {!!errors.username && (
            <Text style={[styles.error]}>{errors.username}</Text>
          )}
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              style={styles.input}
              error={!!errors.firstName}
            />
            <TextInput
              mode="outlined"
              label="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              style={styles.input}
              error={!!errors.lastName}
            />
          </View>
          {(!!errors.firstName || !!errors.lastName) && (
            <Text style={[styles.error]}>
              {errors.firstName} {errors.lastName}
            </Text>
          )}
          <TextInput
            mode="outlined"
            label="Bussiness Physical Address"
            value={formData.businessAddress}
            onChangeText={(text) => handleInputChange("businessAddress", text)}
            style={styles.input}
            error={!!errors.businessAddress}
          />
          {!!errors.businessAddress && (
            <Text style={[styles.error]}>{errors.businessAddress}</Text>
          )}
          <TextInput
            mode="outlined"
            label="Suite/Bldg"
            value={formData.suite}
            onChangeText={(text) => handleInputChange("suite", text)}
            style={styles.input}
            error={!!errors.suite}
          />

          {!!errors.suite && <Text style={[styles.error]}>{errors.suite}</Text>}
          <View style={styles.row}>
            <Select
              placeholder="State"
              options={states.map((state) => ({
                label: `${state.name}(${state.abbreviation})`,
                value: state.name,
              }))}
              selectedValue={formData.state}
              onValueChange={(value) =>
                handleInputChange("state", value as string)
              }
              containerStyle={styles.selectContainerStyle}
              error={errors.state}
            />
            <Select
              placeholder="City"
              options={
                cities
                  ? cities.map((city) => ({ label: city, value: city }))
                  : []
              }
              selectedValue={formData.city}
              onValueChange={(value) =>
                handleInputChange("city", value as string)
              }
              containerStyle={styles.selectContainerStyle}
              error={errors.city}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Zip Code"
              value={formData.zipCode}
              onChangeText={(text) => handleInputChange("zipCode", text)}
              style={styles.input}
              error={!!errors.zipCode}
            />
            <TextInput
              mode="outlined"
              label="EIN/SSN"
              value={formData.einSsn}
              onChangeText={(value) => handleInputChange("einSsn", value)}
              style={styles.input}
              error={!!errors.einSsn}
            />
          </View>
          {(!!errors.zipCode || !!errors.einSsn) && (
            <Text style={[styles.error]}>
              {errors.zipCode} {errors.einSsn}
            </Text>
          )}
          <Select
            placeholder="Business Type"
            options={businessType}
            selectedValue={formData.businessType}
            onValueChange={(value) =>
              handleInputChange("businessType", value as string)
            }
            containerStyle={styles.selectContainerStyle}
            error={errors.businessType}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            style={styles.input}
            error={!!errors.email}
          />
          {!!errors.email && <Text style={[styles.error]}>{errors.email}</Text>}
          <TextInput
            mode="outlined"
            label="Password"
            value={formData.password}
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => handleInputChange("password", text)}
            style={styles.input}
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              />
            }
            error={!!errors.password}
          />
          {!!errors.password && (
            <Text style={[styles.error]}>{errors.password}</Text>
          )}
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={formData.confirmPassword}
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            style={styles.input}
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              />
            }
            error={!!errors.confirmPassword}
          />
          {!!errors.confirmPassword && (
            <Text style={[styles.error]}>{errors.confirmPassword}</Text>
          )}
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={formData.checked ? "checked" : "unchecked"}
              onPress={() => handleInputChange("checked", !formData.checked)}
            />
            <Text>
              I agree to Pinpoints{" "}
              <Link href="/terms" style={styles.boldText}>
                Terms and Condition
              </Link>
            </Text>
          </View>

          {!!errors.checked && (
            <Text style={[styles.error]}>{errors.checked}</Text>
          )}
          {!!errors.general && (
            <Text style={[styles.error, { marginTop: 0 }]}>
              {errors.general}
            </Text>
          )}
          <Button
            loading={loading}
            onPress={() => handleSubmit()}
            variant="contained"
            containerStyle={{ marginTop: 15 }}
          >
            Sign Up
          </Button>
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
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "transparent",
    borderColor: "black",
    borderRadius: 5,
    flex: 1,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: -20,
  },
});

export default Login;
