import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // For star icons
import { router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import TextInput from "@/src/components/TextInput";
import Button from "@/src/components/Button";

const Review = () => {
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [photo, setPhoto] = useState(null); // To handle photo uploads

  const handleRatingPress = (star: number) => {
    setRating(star);
  };

  const handlePhotoUpload = () => {
    // Handle photo upload logic here
    // You can use ImagePicker from expo or any other library
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log("Rating:", rating);
    console.log("Review:", review);
    // Include other form submission logic like API calls
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Review Service" />
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <View style={styles.serviceContainer}>
          <Image
            source={require("../../../../../assets/images/product.png")}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceName}>Service Name</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#e1e1e1",
            paddingVertical: 15,
            marginBottom: 20,
          }}
        >
          <Text style={styles.question}>How would you rate this Service?</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRatingPress(star)}
              >
                <FontAwesome
                  name={star <= rating ? "star" : "star-o"}
                  size={35}
                  color={star <= rating ? colors.primary : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TextInput
          placeholder="name"
          inputStyle={{ backgroundColor: "white", borderRadius: 8 }}
        />
        <TextInput
          value="Write a Review"
          inputStyle={styles.textinput}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.uploadSection}>
          <Ionicons name="cloud-upload-outline" size={30} />
          <Text style={{ fontSize: 18, marginVertical: 5 }}>
            Upload Photo/VIDEO
          </Text>
        </TouchableOpacity>
        <Button containerStyle={{ marginTop: 15 }}>Post</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingVertical: 20,
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "500",
  },
  question: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 100,
    textAlignVertical: "top",
  },
  photoUpload: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  photoUploadText: {
    marginLeft: 10,
    color: "#007AFF",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default Review;
