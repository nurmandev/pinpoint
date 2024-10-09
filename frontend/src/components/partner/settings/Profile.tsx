import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Select from "../../Select";

const businessType = [
  { label: "Retail", value: "retail" },
  { label: "Service", value: "service" },
  { label: "Retail & Services", value: "retail & service" },
];

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <ScrollView>
      <TextInput
        mode="outlined"
        label="Business Legal Name"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Business Physical Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View style={styles.row}>
        <Select
          placeholder="State"
          options={businessType}
          selectedValue={""}
          onValueChange={(value) => {}}
          containerStyle={styles.selectContainerStyle}
        />
        <Select
          placeholder="City"
          options={businessType}
          selectedValue={""}
          onValueChange={(value) => {}}
          containerStyle={styles.selectContainerStyle}
        />
      </View>
      <TextInput
        mode="outlined"
        label="Zip Code"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View style={{ flexDirection: "row" }}>
        <Select
          placeholder="Business Type"
          options={businessType}
          selectedValue={""}
          onValueChange={(value) => {}}
          containerStyle={styles.selectContainerStyle}
        />
      </View>
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
      <Button>Change Password</Button>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    height: 50,
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
