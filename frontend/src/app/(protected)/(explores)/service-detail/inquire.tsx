import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, Checkbox, useTheme } from "react-native-paper";
import { router } from "expo-router";
import TextInput from "@/src/components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";

const Inquire = () => {
  const { colors } = useTheme();
  const [contactMethod, setContactMethod] = useState("");
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Service Name - $1500.9" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          placeholder="Customer Name"
          inputStyle={styles.textContainer}
        />
        <TextInput placeholder="Email" inputStyle={styles.textContainer} />
        <TextInput placeholder="Phone" inputStyle={styles.textContainer} />
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>Prefer Method of Contact</Text>
          {["text", "email", "call"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => setContactMethod(item)}
            >
              <Checkbox.Android
                status={contactMethod === item ? "checked" : "unchecked"}
              />
              <Text style={[styles.optionText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput placeholder="Address" inputStyle={styles.textContainer} />
        <TextInput
          placeholder="Service Request Date"
          inputStyle={styles.textContainer}
        />

        <TextInput
          inputStyle={styles.textinput}
          placeholder="Please describe some more details about the service you are requesting"
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.uploadSection}>
          <Ionicons name="cloud-upload-outline" size={30} />
          <Text style={{ fontSize: 18, marginVertical: 5 }}>
            Upload a Photo or Video
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Location Name</Text>

        <View
          style={[
            styles.location,
            { backgroundColor: colors.elevation.level2 },
          ]}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            Yori house, Rivers Street
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.replace("/service-detail/success")}>
            Submit
          </Button>
          <Text
            style={{
              textAlign: "center",
              color: "#D67732",
              paddingVertical: 15,
              fontSize: 16,
            }}
          >
            No payments are made through our platform
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Inquire;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  textContainer: { backgroundColor: "white", borderRadius: 8 },
  text: { fontSize: 18, marginBottom: 5 },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#626262",
    textTransform: "capitalize",
  },
  uploadSection: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e1e1e1",
    marginVertical: 15,
  },
  textinput: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  location: {
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "flex-start",
    padding: 5,
    marginVertical: 5,
    borderColor: "#e1e1e1",
  },
  buttonContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
});
