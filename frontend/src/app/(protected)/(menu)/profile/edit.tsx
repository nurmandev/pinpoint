import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Appbar, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { useUser } from "@/src/context/User";
import { imageURL } from "@/src/services/api";
import Select from "@/src/components/Select";
import { states } from "@/src/utils/country";
import * as ImagePicker from "expo-image-picker";
import { useToastNotification } from "@/src/context/ToastNotificationContext";

const Edit = () => {
  const { colors } = useTheme();
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<(File & { uri: string }) | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMediaUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        // Convert the selected image to a File type object
        const selectedImage = {
          uri: result.assets[0].uri,
          name: result.assets[0].uri.split("/").pop(),
          type: "image/jpeg", // Adjust based on media type
        } as any;
        setImage(selectedImage);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateUser({ firstName, lastName, state, city, image });
      addNotification({ message: "Profile updated" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const cities = state
    ? states.find((stat) => stat.name === state)?.cities
    : [];
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Manage Profile" />
        {loading ? (
          <ActivityIndicator size={18} />
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: colors.primary,
              marginRight: 16,
            }}
            onPress={handleSubmit}
          >
            Apply
          </Text>
        )}
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.selectedItem}>
          <Image
            source={{ uri: image?.uri || imageURL + user?.avatarUrl }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.editCont} onPress={handleMediaUpload}>
            <Feather name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.userDetail}>
          <View style={styles.name}>
            <Text style={styles.fullname}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.username}>{user?.username}</Text>
          </View>
        </View>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <Select
          containerStyle={{ flex: 1, marginBottom: 20 }}
          placeholder="State"
          options={states.map((state) => ({
            label: `${state.name}(${state.abbreviation})`,
            value: state.name,
          }))}
          selectedValue={state}
          onValueChange={(value) => setState(value as string)}
        />
        <Select
          containerStyle={{ flex: 1, marginBottom: 20 }}
          placeholder="City"
          options={
            cities ? cities.map((city) => ({ label: city, value: city })) : []
          }
          selectedValue={city}
          onValueChange={(value) => setCity(value as string)}
        />
        <TextInput
          placeholder=""
          value={password}
          onChangeText={(text) => setPassword(text)}
          isPassword
        />
        <Text style={{ color: colors.primary, fontWeight: "600" }}>
          Change Password
        </Text>
      </ScrollView>
    </View>
  );
};

export default Edit;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  selectedItem: {
    // width: WIDTH,
    height: WIDTH * 0.5,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  userDetail: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  name: {},
  username: {
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 5,
  },
  fullname: { fontSize: 24, fontWeight: "600" },
  editCont: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
  },
  container: { borderTopColor: "#f1f1f1", borderTopWidth: 1, paddingTop: 30 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 15,
  },
  gridItem: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
  },
  gridLabel: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#555",
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    borderColor: "#f00",
    borderWidth: 1,
  },
  deleteText: {
    fontSize: 16,
    color: "#f00",
  },
});
