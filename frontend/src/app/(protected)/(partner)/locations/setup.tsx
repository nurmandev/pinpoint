import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Divider,
  TextInput,
  useTheme,
  Button as PaperButton,
} from "react-native-paper";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import HoursOfOperation from "@/src/components/partner/location/HoursOfOperation";
import useDimensions from "@/src/hooks/useDimension";
import { useLocation } from "@/src/context/Location";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const categoriesOption = [
  { label: "Clothing", value: "clothing" },
  { label: "Electronic", value: "electronic" },
];
const Location = () => {
  const { colors } = useTheme();
  const { createNewLocation } = useLocation();
  const { isMobile } = useDimensions();
  const [menuText, setMenuText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    description: "",
    categories: [] as string[],
    menu: [],
    images: [] as string[],
    poll: {
      question: "", // Poll question
      options: ["", "", ""] as string[], // Poll options as an array of strings
    },
    hoursOfOperation: [] as { day: string; open: string; close: string }[],
    errors: {
      locationName: null as string | null,
      address: null as string | null,
      description: null as string | null,
      menu: null as string | null,
      images: null as string | null,
      categories: null as string | null,
      pollQuestion: null as string | null,
      pollOptions: null as string | null,
      hoursOfOperation: null as string | null,
    },
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: null, // Clear error when input is changed
      },
    }));
  };

  // Update poll question
  const handlePollQuestionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      poll: { ...prev.poll, question: value },
      errors: {
        ...prev.errors,
        pollQuestion: null,
      },
    }));
  };

  // Update poll options
  const handlePollOptionChange = (index: number, value: string) => {
    const updatedOptions = [...formData.poll.options];
    updatedOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      poll: { ...prev.poll, options: updatedOptions },
      errors: {
        ...prev.errors,
        pollOptions: null,
      },
    }));
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange("images", [result.assets[0].uri]);
    }
  };

  const handleAddMenu = () => {
    if (!menuText) return;
    handleChange("menu", [...formData.menu, menuText]);
    setMenuText("");
  };
  const removeMenu = (text: string) => {
    handleChange("menu", [...formData.menu.filter((item) => item !== text)]);
  };

  const handleAddLocation = async () => {
    let valid = true;

    const updatedErrors = {
      locationName: "",
      address: "",
      description: "",
      images: "",
      categories: "",
      pollQuestion: "",
      pollOptions: "",
      hoursOfOperation: "",
      menu: "",
    };

    if (!formData.address.trim()) {
      updatedErrors.address = "Address is required";
      valid = false;
    }
    if (!formData.locationName.trim()) {
      updatedErrors.locationName = "Location name is required";
      valid = false;
    }

    if (!formData.description.trim()) {
      updatedErrors.description = "Location Description is required";
      valid = false;
    }

    if (!formData.categories.length) {
      updatedErrors.categories = "Please select at least one category";
      valid = false;
    }

    if (formData.images?.length < 1) {
      updatedErrors.images = "Please add an image of the location";
      valid = false;
    }

    if (!formData.poll.question.trim()) {
      updatedErrors.pollQuestion = "Poll question is required";
      valid = false;
    }

    if (formData.poll.options.length < 2) {
      updatedErrors.pollOptions = "At least two poll options are required";
      valid = false;
    } else if (formData.poll.options.some((option) => !option.trim())) {
      updatedErrors.pollOptions = "Poll options cannot be empty";
      valid = false;
    }

    if (!valid) {
      setFormData((prev) => ({
        ...prev,
        errors: updatedErrors,
      }));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await createNewLocation({
        locationName: formData.locationName,
        address: formData.address,
        description: formData.description,
        categories: formData.categories,
        images: formData.images,
        hoursOfOperation: formData.hoursOfOperation,
        menu: formData.menu,
        poll: formData.poll,
      });
      router.back();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <>
          <Text style={styles.breadcrum}>
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Dashboard
            </Text>{" "}
            / Location
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}>Location Setup</Text>
            <Button containerStyle={{ width: 100 }}>Save</Button>
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.photoLabel}>Add a photo of your Location</Text>
        <View
          style={[styles.row, { flexDirection: isMobile ? "column" : "row" }]}
        >
          <View style={[styles.leftCont, !isMobile && { flex: 2 }]}>
            <View style={styles.imageButton}>
              <View
                style={[
                  styles.imageCircle,
                  { backgroundColor: colors.elevation.level4 },
                ]}
              >
                {formData.images.length > 0 ? (
                  <Image
                    source={{ uri: formData.images[0] }}
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require("../../../../../assets/images/logo1.png")}
                    style={{ height: 35, width: 30, marginTop: 10 }}
                    resizeMode="contain"
                  />
                )}
                {Platform.OS !== "web" && (
                  <AntDesign
                    name="edit"
                    size={20}
                    color="white"
                    style={{
                      backgroundColor: "black",
                      borderRadius: 10,
                      padding: 5,
                      overflow: "hidden",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    onPress={handlePickImage}
                  />
                )}
              </View>
            </View>
            {formData.errors.images && (
              <Text style={styles.errorText}>{formData.errors.images}</Text>
            )}
            {Platform.OS === "web" && (
              <View style={[styles.row, { gap: 10 }]}>
                <Button
                  containerStyle={styles.photoButton}
                  textStyle={{ color: "black" }}
                  variant="outlined"
                  onPress={handlePickImage}
                >
                  Replace Photo
                </Button>
                <Button
                  containerStyle={styles.photoButton}
                  textStyle={{ color: "black" }}
                  variant="outlined"
                  onPress={() => handleChange("image", null)}
                >
                  Remove
                </Button>
              </View>
            )}
          </View>
          <View style={[styles.rightCont, !isMobile && { flex: 3 }]}>
            <TextInput
              mode="outlined"
              label="Location Name"
              value={formData.locationName}
              onChangeText={(text) => handleChange("locationName", text)}
              style={styles.input}
            />

            {formData.errors.locationName && (
              <Text style={styles.errorText}>
                {formData.errors.locationName}
              </Text>
            )}

            <TextInput
              mode="outlined"
              label="Address"
              value={formData.address}
              onChangeText={(text) => handleChange("address", text)}
              style={styles.input}
            />

            {formData.errors.address && (
              <Text style={styles.errorText}>{formData.errors.address}</Text>
            )}
            <TextInput
              mode="outlined"
              label="Location Description"
              value={formData.description}
              onChangeText={(text) => handleChange("description", text)}
              style={{ marginBottom: 20, height: 100 }}
              multiline
              numberOfLines={3}
              maxLength={100}
            />

            {formData.errors.description && (
              <Text style={styles.errorText}>
                {formData.errors.description}
              </Text>
            )}
            <MultiSelect
              onValuesChange={(value) => handleChange("categories", value)}
              options={categoriesOption}
              placeholder="Location Categories"
            />

            {formData.errors.categories && (
              <Text
                style={[styles.errorText, { marginTop: 0, marginBottom: 0 }]}
              >
                {formData.errors.categories}
              </Text>
            )}
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Menu</Text>
            <View>
              <TextInput
                mode="outlined"
                label="Category"
                value={menuText}
                onChangeText={(text) => setMenuText(text)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.addCategory}
                onPress={handleAddMenu}
              >
                <Ionicons name="add" size={20} />
                <Text style={{ fontWeight: "500" }}>Add Category</Text>
              </TouchableOpacity>
            </View>
            {formData.errors.menu && (
              <Text
                style={[styles.errorText, { marginTop: 0, marginBottom: 0 }]}
              >
                {formData.errors.menu}
              </Text>
            )}
            <View>
              {formData.menu.map((item) => (
                <View style={styles.menu} key={item}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <MaterialIcons name="drag-indicator" size={20} />
                    <Text>{item}</Text>
                  </View>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="red"
                    onPress={() => removeMenu(item)}
                  />
                </View>
              ))}
              {/* <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <PaperButton mode="text" icon={"plus"}>
                  Add Menu
                </PaperButton>
              </View> */}
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Hours of operation</Text>
            <HoursOfOperation
              onChange={(value) => handleChange("hoursOfOperation", value)}
            />
            {formData.errors.hoursOfOperation && (
              <Text
                style={[styles.errorText, { marginTop: 0, marginBottom: 0 }]}
              >
                {formData.errors.hoursOfOperation}
              </Text>
            )}
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Add Poll</Text>
            <TextInput
              mode="outlined"
              label="Question"
              value={formData.poll.question}
              onChangeText={handlePollQuestionChange}
              style={styles.input}
            />
            {formData.errors.pollQuestion && (
              <Text style={styles.errorText}>
                {formData.errors.pollQuestion}
              </Text>
            )}
            {formData.poll.options.map((option, index) => (
              <TextInput
                key={index}
                mode="outlined"
                label={`Option ${index + 1}`}
                value={option}
                onChangeText={(text) => handlePollOptionChange(index, text)}
                style={styles.input}
              />
            ))}
            {formData.errors.pollOptions && (
              <Text style={styles.errorText}>
                {formData.errors.pollOptions}
              </Text>
            )}
            {/* <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <PaperButton mode="text" icon={"plus"}>
                Save Poll
              </PaperButton>
            </View> */}
          </View>
        </View>
        {error && (
          <Text style={[styles.errorText, { marginTop: 0, marginBottom: 0 }]}>
            {error}
          </Text>
        )}
        <Button
          containerStyle={{}}
          onPress={handleAddLocation}
          loading={loading}
        >
          Save
        </Button>
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  breadcrum: { marginBottom: 30 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    padding: 15,
  },
  photoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCont: {},
  rightCont: {},
  imageButton: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    marginBottom: 10,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 100,
    minWidth: 100,
    borderWidth: 3,
    borderColor: "white",
  },
  photoButton: {
    backgroundColor: "white",
    flex: 1,
  },

  input: {
    marginBottom: 20,
    height: 50,
  },
  addCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    right: 10,
    top: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  menu: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -20,
    marginBottom: 20,
  },
});
