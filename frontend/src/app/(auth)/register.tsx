import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { Link } from "expo-router";
import { Checkbox, useTheme } from "react-native-paper";
import Select from "@/src/components/Select";
import { UserRole } from "@/src/types/user";
import { useAuth } from "@/src/context/Auth";
import { RegistrationData } from "@/src/types/auth";
import RegistrationSuccessModal from "@/src/components/auth/RegisterModal";
import { states } from "@/src/utils/country";

const businessType = [
  { label: "I sell Products", value: "products" },
  { label: "I sell Services", value: "services" },
  { label: "i sell Products & Services", value: "products & services" },
];

const Register = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("User");
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    role: UserRole.CUSTOMER,
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
  console.log(formData.role);
  const validateForm = () => {
    const newErrors: any = {};
    if (currentTab === "User") {
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
    } else {
      if (!formData.businessLegalName)
        newErrors.businessLegalName = "Business Legal Name is required";
      if (!formData.businessAddress)
        newErrors.businessAddress = "Business Address is required";
      if (!formData.suite) newErrors.suite = "Suite is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
      if (!formData.businessType)
        newErrors.businessType = "Business Type is required";
      if (!formData.einSsn) newErrors.einSsn = "EIN/SSN is required";
    }
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
        } else {
          setErrors((prev) => ({ ...prev, general: error.message }));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const cities = formData.state
    ? states.find((state) => state.name === formData.state)?.cities
    : [];

  const renderForm = () => {
    switch (currentTab) {
      case "User":
        return (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="First Name"
              onChangeText={(text) => handleInputChange("firstName", text)}
              error={errors.firstName}
              value={formData.firstName}
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={(text) => handleInputChange("lastName", text)}
              value={formData.lastName}
              error={errors.lastName}
            />
            <TextInput
              placeholder="Username"
              onChangeText={(text) => handleInputChange("username", text)}
              value={formData.username}
              error={errors.username}
            />
            <View style={styles.selectContainer}>
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="State"
                options={states.map((state) => ({
                  label: `${state.name}(${state.abbreviation})`,
                  value: state.name,
                }))}
                selectedValue={formData.state}
                onValueChange={(value) =>
                  handleInputChange("state", value as string)
                }
                error={errors.state}
              />
              <Select
                containerStyle={{ flex: 1 }}
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
                error={errors.city}
              />
            </View>

            <TextInput
              placeholder="Email"
              onChangeText={(text) => handleInputChange("email", text)}
              value={formData.email}
              error={errors.email}
            />
            <TextInput
              placeholder="Password"
              isPassword
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              error={errors.password}
            />
            <TextInput
              placeholder="Confirm Password"
              isPassword
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              error={errors.confirmPassword}
            />
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={formData.checked ? "checked" : "unchecked"}
                onPress={(value) =>
                  handleInputChange("checked", !formData.checked)
                }
              />
              <Text>
                I agree to Pinpoints{" "}
                <Link href="/terms" style={styles.boldText}>
                  Terms and Condition
                </Link>
              </Text>
            </View>
            {errors.checked || errors.general ? (
              <Text style={{ color: "red", marginBottom: 20 }}>
                {errors.checked}
                {errors.general}
              </Text>
            ) : null}
            <Button
              variant="contained"
              onPress={handleSubmit}
              loading={loading}
            >
              Sign Up
            </Button>
            <View style={styles.linkContainer}>
              <Text>Already have an account?</Text>
              <Link href={"/login"} style={styles.signup}>
                Log in
              </Link>
            </View>
          </View>
        );
      case "Partner":
        return (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Business Legal Name"
              onChangeText={(text) =>
                handleInputChange("businessLegalName", text)
              }
              value={formData.businessLegalName}
              error={errors.businessLegalName}
            />
            <TextInput
              placeholder="Username"
              onChangeText={(text) => handleInputChange("username", text)}
              value={formData.username}
              error={errors.username}
            />
            <View style={styles.nameContainer}>
              <TextInput
                containerStyle={{ flex: 1 }}
                placeholder="Owner First Name"
                onChangeText={(text) => handleInputChange("firstName", text)}
                value={formData.firstName}
                error={errors.firstName}
              />
              <TextInput
                containerStyle={{ flex: 1 }}
                placeholder="Owner Last Name"
                onChangeText={(text) => handleInputChange("lastName", text)}
                value={formData.lastName}
                error={errors.lastName}
              />
            </View>
            <TextInput
              placeholder="Business Physical Address"
              onChangeText={(text) =>
                handleInputChange("businessAddress", text)
              }
              value={formData.businessAddress}
              error={errors.businessAddress}
            />
            <TextInput
              placeholder="Suite/Bldg"
              onChangeText={(text) => handleInputChange("suite", text)}
              value={formData.suite}
              error={errors.suite}
            />
            <View style={styles.selectContainer}>
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="State"
                options={states.map((state) => ({
                  label: `${state.name}(${state.abbreviation})`,
                  value: state.name,
                }))}
                selectedValue={formData.state}
                onValueChange={(value) =>
                  handleInputChange("state", value as string)
                }
                error={errors.state}
              />
              <Select
                containerStyle={{ flex: 1 }}
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
                error={errors.city}
              />
            </View>
            <TextInput
              placeholder="Zip Code"
              onChangeText={(text) => handleInputChange("zipCode", text)}
              value={formData.zipCode}
              error={errors.zipCode}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => handleInputChange("email", text)}
              value={formData.email}
              error={errors.email}
            />
            <Select
              placeholder="Business Type"
              options={businessType}
              selectedValue={formData.businessType}
              containerStyle={styles.selectContainerStyle}
              onValueChange={(value) =>
                handleInputChange("businessType", value as string)
              }
              error={errors.businessType}
            />
            <TextInput
              placeholder="EIN/SSN"
              onChangeText={(text) => handleInputChange("einSsn", text)}
              value={formData.einSsn}
              error={errors.einSsn}
            />
            <TextInput
              placeholder="Password"
              isPassword
              onChangeText={(text) => handleInputChange("password", text)}
              value={formData.password}
              error={errors.password}
            />
            <TextInput
              placeholder="Confirm Password"
              isPassword
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              value={formData.confirmPassword}
              error={errors.confirmPassword}
            />
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
            <Button
              variant="contained"
              onPress={handleSubmit}
              loading={loading}
            >
              Sign Up
            </Button>
            <View style={styles.linkContainer}>
              <Text>Already have an account?</Text>
              <Link href={"/login"} style={styles.signup}>
                Log in
              </Link>
            </View>
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
        <Text style={styles.description}>Sign up to access your account</Text>
      </View>
      <View style={styles.tabContainer}>
        <Button
          onPress={() => {
            setCurrentTab("User");
            handleInputChange("role", UserRole.CUSTOMER);
          }}
          variant={currentTab === "User" ? "contained" : "outlined"}
          containerStyle={{ flex: 1 }}
        >
          As a User
        </Button>
        <Button
          onPress={() => {
            setCurrentTab("Partner");
            handleInputChange("role", UserRole.PARTNER);
          }}
          variant={currentTab === "Partner" ? "contained" : "outlined"}
          containerStyle={{ flex: 1 }}
        >
          As a Partner
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {renderForm()}
      </ScrollView>
      <RegistrationSuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    fontSize: 14,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  selectContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    // marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  signup: {
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  selectContainerStyle: {
    marginBottom: 20,
  },
});
