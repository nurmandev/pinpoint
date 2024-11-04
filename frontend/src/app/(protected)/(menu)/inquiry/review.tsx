import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Appbar, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import TextInput from "@/src/components/TextInput";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { useLocalSearchParams } from "expo-router";
import { imageURL } from "@/src/services/api";
import { useUser } from "@/src/context/User";
import { submitReview } from "@/src/services/lead";

const Review = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const { id, image, serviceName } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [photo, setPhoto] = useState<(File & { uri: string }) | null>(null); // Store the photo's URI
  const [name, setName] = useState(user?.username);
  const [loading, setLoading] = useState(false);

  const handleRatingPress = (star: number) => {
    setRating(star);
  };

  const handlePhotoUpload = async () => {
    // Ask for permission to access photos
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos to upload."
      );
      return;
    }

    // Open image picker to select photo/video
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = {
        uri: result.assets[0].uri,
        name: result.assets[0].uri.split("/").pop(),
        type: "image/jpeg",
      } as any;
      setPhoto(selectedImage);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!rating) {
      addNotification({
        message: "Please provide a rating.",
        error: true,
      });
      isValid = false;
    }
    if (!review) {
      addNotification({
        message: "Please write a review.",
        error: true,
      });
      isValid = false;
    }
    if (!name) {
      addNotification({
        message: "Please enter your name.",
        error: true,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    if (!id) return;

    // Mock API call or actual review submission
    const reviewData = {
      name,
      rating,
      content: review,
      image: photo, // Include photo if uploaded
    };
    try {
      setLoading(true);
      await submitReview(id as string, reviewData);

      // Submit review logic here (e.g., API call)
      addNotification({
        message: "Review submitted successfully!",
      });

      // Reset form
      setRating(0);
      setReview("");
      setPhoto(null);
      setName("");
      router.back();
    } catch (error: any) {
      addNotification({
        message: error,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Review Service" />
      </Appbar.Header>
      <ScrollView style={{ padding: 15, paddingBottom: 30, flex: 1 }}>
        <View style={styles.serviceContainer}>
          <Image
            source={{ uri: imageURL + image }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceName}>{serviceName}</Text>
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
          placeholder="Name"
          inputStyle={{ backgroundColor: "white", borderRadius: 8 }}
          value={name}
          editable={false}
          onChangeText={(text) => {
            setName(text);
          }}
        />

        <TextInput
          value={review}
          onChangeText={(text) => {
            setReview(text);
          }}
          placeholder="Write a Review"
          inputStyle={styles.textinput}
          multiline={true}
          numberOfLines={4}
        />

        {photo && (
          <Image source={{ uri: photo.uri }} style={styles.previewImage} />
        )}
        <TouchableOpacity
          style={styles.uploadSection}
          onPress={handlePhotoUpload}
        >
          <Ionicons name="cloud-upload-outline" size={30} />
          <Text style={{ fontSize: 18, marginVertical: 5 }}>
            Upload Photo/VIDEO
          </Text>
        </TouchableOpacity>

        <Button
          loading={loading}
          containerStyle={{ marginTop: 15 }}
          onPress={handleSubmit}
        >
          Post
        </Button>
        <View style={{ height: 30 }} />
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
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 5,
  },
  textinput: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
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
  previewImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Review;
