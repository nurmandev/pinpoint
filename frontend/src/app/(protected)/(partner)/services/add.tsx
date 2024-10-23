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
  Checkbox,
} from "react-native-paper";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Select from "@/src/components/Select";
import useDimensions from "@/src/hooks/useDimension";
import { useLocation } from "@/src/context/Location";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useService } from "@/src/context/Service";
import { ServiceData } from "@/src/services/service";

const categoriesOption = [
  { label: "Clothing", value: "clothing" },
  { label: "Electronic", value: "electronic" },
];

const subCategoriesOption = [
  { label: "Shirts", value: "Shirts" },
  { label: "Shorts", value: "Shorts" },
  { label: "Jacket", value: "Jacket" },
];

const Location = () => {
  const { colors } = useTheme();
  const { isMobile } = useDimensions();

  const { createNewService } = useService();
  const { locations: userLocations } = useLocation();

  // State Management
  const [formData, setFormData] = useState<ServiceData>({
    name: "",
    description: "",
    price: null,
    priceType: "flat",
    priceRange: null,
    duration: 0,
    images: [],
    location: [],
    mainCategory: [],
    category: [],
    subCategory: [],
    options: [],
    homeService: false,
    serviceRadius: "",
  });
  const [image, setImage] = useState({ url: "", name: "" });
  const [image2, setImage2] = useState({ url: "", name: "" });
  const [image3, setImage3] = useState({ url: "", name: "" });
  const [image4, setImage4] = useState({ url: "", name: "" });
  const [image5, setImage5] = useState({ url: "", name: "" });
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    priceType: "",
    priceRange: "",
    duration: "",
    images: "",
    location: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    options: "",
  });

  const [serviceOptions, setServiceOptions] = useState<ServiceData["options"]>([
    { optionCategory: "", optionName: "" },
  ]);
  const [locations, setLocations] = useState<ServiceData["location"]>([""]);

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      switch (index) {
        case 1:
          setImage({
            url: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
          });
          break;
        case 2:
          setImage2({
            url: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
          });
          break;
        case 3:
          setImage3({
            url: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
          });
          break;
        case 4:
          setImage4({
            url: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
          });
          break;
        case 5:
          setImage5({
            url: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}.jpg`,
          });
          break;

        default:
          break;
      }
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  // Handle Input Change
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors on change
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add Option
  const addOption = () => {
    setServiceOptions((prev) => [
      ...prev,
      { optionCategory: "", optionName: "" },
    ]);
  };

  const addLocation = () => {
    setLocations((prev) => [...prev, ""]);
  };

  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
    setErrors((prev) => ({
      ...prev,
      location: "",
    }));
  };

  // Handle Option Change
  const handleOptionChange = (
    index: number,
    field: "optionCategory" | "optionName",
    value: string
  ) => {
    const updatedOptions = [...serviceOptions];
    updatedOptions[index][field] = value;
    setServiceOptions(updatedOptions);
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handlePriceChange = (field: "from" | "to", value: number) => {
    const updatedOptions = formData.priceRange || { from: 0, to: 0 };

    updatedOptions[field] = value;
    setFormData((prev) => ({
      ...prev,
      priceRange: updatedOptions,
    }));
  };

  // Validate Form
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      description: "",
      price: "",
      priceType: "",
      priceRange: "",
      duration: "",
      images: "",
      location: "",
      mainCategory: "",
      category: "",
      subCategory: "",
      options: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required.";
      valid = false;
    }

    if (!image && !image2 && image3 && image4 && image5) {
      newErrors.images = "Add at least one image";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Service description is required.";
      valid = false;
    }

    if (!formData.priceType.trim()) {
      newErrors.priceType = "Service price type is required.";
      valid = false;
    }

    if (
      formData.priceType === "flat" &&
      (!formData.price || formData.price <= 0)
    ) {
      newErrors.price = "Valid price is required.";
      valid = false;
    }

    if (
      formData.priceType === "range" &&
      (!formData.priceRange ||
        formData.priceRange.from <= 0 ||
        formData.priceRange.to <= 0)
    ) {
      newErrors.priceRange = "Enter a valid price range";
      valid = false;
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Valid duration is required.";
      valid = false;
    }

    if (locations.length === 1 && locations[0] === "") {
      newErrors.location = "Add at least one location";
      valid = false;
    }

    if (formData.mainCategory.length <= 0) {
      newErrors.mainCategory = "Select at least one main category.";
      valid = false;
    }

    if (formData.category.length <= 0) {
      newErrors.category = "Select at least one  category.";
      valid = false;
    }

    if (formData.subCategory.length <= 0) {
      newErrors.subCategory = "Select at least one sub category.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  // Handle Add Service
  const handleAddService = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Prepare data
      const payload = {
        ...formData,
        options: serviceOptions,
        location: locations,
        images: [image, image2, image3, image4, image5].filter(
          (img) => img.url !== ""
        ),
      };
      setUploading(true);
      // Create new service
      await createNewService(payload);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        priceType: "flat",
        priceRange: { from: 0, to: 0 },
        duration: 0,
        images: [],
        location: [],
        mainCategory: [],
        category: [],
        subCategory: [],
        options: [],
        homeService: false,
        serviceRadius: "",
      });
      setImage({ url: "", name: "" });
      setImage2({ url: "", name: "" });
      setImage3({ url: "", name: "" });
      setImage4({ url: "", name: "" });
      setImage5({ url: "", name: "" });
      setServiceOptions([]);
      router.back();
    } catch (error) {
      console.error("Error adding service:", error);
      // Alert.alert("Error", "Failed to add service. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <>
          <Text style={styles.breadcrum}>
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Dashboard
            </Text>
            / Service
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}>Add Service</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button
                variant="outlined"
                containerStyle={{ width: 150, backgroundColor: "white" }}
              >
                Copy Service
              </Button>
              <Button
                onPress={handleAddService}
                containerStyle={{ width: 100 }}
                loading={uploading}
              >
                Save
              </Button>
            </View>
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[styles.row, { flexDirection: isMobile ? "column" : "row" }]}
        >
          <View style={styles.leftCont}>
            {Platform.OS !== "web" && (
              <>
                <Button
                  variant="outlined"
                  containerStyle={{ width: 150, backgroundColor: "white" }}
                >
                  Copy Service
                </Button>
                <Divider style={{ marginVertical: 20 }} />
              </>
            )}
            <Text style={styles.photoLabel}>Basic Details</Text>
            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 15,
                height: 200,
              }}
            >
              <TouchableOpacity
                onPress={() => pickImage(1)}
                style={styles.imageButton}
              >
                {image.url ? (
                  <Image style={styles.image} source={{ uri: image.url }} />
                ) : (
                  <>
                    <Ionicons name="add" size={28} color="gray" />
                    <Text>Add Image</Text>
                  </>
                )}
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => pickImage(2)}
                    style={styles.imageButton}
                  >
                    {image2.url ? (
                      <Image
                        style={styles.image}
                        source={{ uri: image2.url }}
                      />
                    ) : (
                      <Ionicons name="add" size={28} color="gray" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pickImage(3)}
                    style={styles.imageButton}
                  >
                    {image3.url ? (
                      <Image
                        style={styles.image}
                        source={{ uri: image3.url }}
                      />
                    ) : (
                      <Ionicons name="add" size={28} color="gray" />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => pickImage(4)}
                    style={styles.imageButton}
                  >
                    {image4.url ? (
                      <Image
                        style={styles.image}
                        source={{ uri: image4.url }}
                      />
                    ) : (
                      <Ionicons name="add" size={28} color="gray" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pickImage(5)}
                    style={styles.imageButton}
                  >
                    {image5.url ? (
                      <Image
                        style={styles.image}
                        source={{ uri: image5.url }}
                      />
                    ) : (
                      <Ionicons name="add" size={28} color="gray" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TextInput
              mode="outlined"
              label="Service Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              style={styles.input}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <TextInput
              mode="outlined"
              label="Description"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              style={{ marginBottom: 20, height: 100 }}
              multiline
              numberOfLines={3}
              maxLength={200}
            />
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}
            <Select
              placeholder="Estimate Duration"
              selectedValue={formData.duration}
              options={["1", "2", "3", "4", "5", "6", "7"].map((option) => ({
                label: option,
                value: option,
              }))}
              onValueChange={(value) =>
                handleInputChange("duration", value as string)
              }
              containerStyle={styles.select}
              error={errors.duration}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 40,
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text>Flat Price</Text>
                <Checkbox.Android
                  status={
                    formData.priceType === "flat" ? "checked" : "unchecked"
                  }
                  onPress={() => handleInputChange("priceType", "flat")}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text>Price Range</Text>
                <Checkbox.Android
                  status={
                    formData.priceType === "range" ? "checked" : "unchecked"
                  }
                  onPress={() => handleInputChange("priceType", "range")}
                />
              </View>
            </View>
            {formData.priceType === "range" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    mode="outlined"
                    label="From"
                    keyboardType="numeric"
                    value={formData.priceRange?.from as unknown as string}
                    onChangeText={(text) =>
                      handlePriceChange("from", text as unknown as number)
                    }
                    style={[styles.input, { paddingLeft: 20, flex: 1 }]}
                  />
                  <FontAwesome
                    style={styles.currency}
                    name="dollar"
                    size={20}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    mode="outlined"
                    label="To"
                    keyboardType="numeric"
                    value={formData.priceRange?.to as unknown as string}
                    onChangeText={(text) =>
                      handlePriceChange("to", text as unknown as number)
                    }
                    style={[styles.input, { paddingLeft: 20, flex: 1 }]}
                  />
                  <FontAwesome
                    style={styles.currency}
                    name="dollar"
                    size={20}
                  />
                </View>
              </View>
            ) : (
              <View>
                <TextInput
                  mode="outlined"
                  label="Price"
                  keyboardType="numeric"
                  value={formData.price as unknown as string}
                  onChangeText={(text) => handleInputChange("price", text)}
                  style={[styles.input, { paddingLeft: 20 }]}
                />

                <FontAwesome style={styles.currency} name="dollar" size={20} />

                {errors.price ? (
                  <Text style={styles.errorText}>{errors.price}</Text>
                ) : null}
              </View>
            )}

            {errors.priceRange ? (
              <Text style={styles.errorText}>{errors.priceRange}</Text>
            ) : null}

            {locations.map((value, index) => (
              <Select
                key={index}
                placeholder="Location Name"
                selectedValue={value}
                options={userLocations.map((location) => ({
                  label: location.locationName,
                  value: location._id,
                }))}
                onValueChange={(value) =>
                  handleLocationChange(index, value as string)
                }
                containerStyle={styles.select}
                error={errors.location}
              />
            ))}
            <MultiSelect
              placeholder="Menu Category"
              options={["Men Shirts", "Shorts", "Women shirts", "Jacket"].map(
                (option) => ({ label: option, value: option })
              )}
              onValuesChange={(value) =>
                handleInputChange("mainCategory", value)
              }
              containerStyle={styles.select}
              error={errors.mainCategory}
            />
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <PaperButton onPress={addLocation} mode="text" icon={"plus"}>
                Add Additional Location
              </PaperButton>
            </View>
          </View>
          <View style={styles.rightCont}>
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <Text style={styles.photoLabel}>Service Details</Text>
              <Divider style={{ marginVertical: 20 }} />
              {isMobile && (
                <Text
                  style={[
                    { fontWeight: "600", fontSize: 16, marginBottom: 10 },
                  ]}
                >
                  Service Category
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                {!isMobile && <Text style={{ flex: 1 }}>Service Category</Text>}
                <MultiSelect
                  onValuesChange={(value) =>
                    handleInputChange("category", value)
                  }
                  options={categoriesOption}
                  placeholder="Category"
                  containerStyle={{ flex: 2 }}
                  error={errors.category}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {!isMobile && <Text style={{ flex: 1 }}>Subcategory</Text>}
                <MultiSelect
                  onValuesChange={(value) =>
                    handleInputChange("subCategory", value)
                  }
                  options={subCategoriesOption}
                  placeholder="Subcategory"
                  containerStyle={{ flex: 2 }}
                  error={errors.subCategory}
                />
              </View>
              <Divider style={{ marginVertical: 20 }} />

              {serviceOptions.map((option, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ flex: 1 }}>Option {index + 1}</Text>
                  <Select
                    onValueChange={(value) =>
                      handleOptionChange(
                        index,
                        "optionCategory",
                        value as string
                      )
                    }
                    options={[
                      { label: "Color", value: "color" },
                      { label: "Size", value: "size" },
                    ]}
                    selectedValue={option.optionCategory}
                    placeholder="Option Category"
                    containerStyle={{ flex: 1 }}
                    inputStyle={{ fontSize: 13 }}
                  />
                  <Select
                    onValueChange={(value) =>
                      handleOptionChange(index, "optionName", value as string)
                    }
                    options={[
                      { label: "Red", value: "red" },
                      { label: "Blue", value: "blue" },
                    ]}
                    selectedValue={option.optionName}
                    placeholder="Option Name"
                    containerStyle={{ flex: 1 }}
                    inputStyle={{ fontSize: 13 }}
                  />
                </View>
              ))}
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <PaperButton onPress={addOption} mode="text" icon={"plus"}>
                  Add Another Option
                </PaperButton>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text style={styles.photoLabel}>Discoverability</Text>
              <Divider style={{ marginVertical: 20 }} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>In-Home Service</Text>
                <Checkbox.Android
                  status={formData.homeService ? "checked" : "unchecked"}
                  onPress={() =>
                    handleCheckboxChange("homeService", !formData.homeService)
                  }
                />
              </View>

              <TextInput
                mode="outlined"
                label="Service Radius"
                value={formData.serviceRadius}
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleInputChange("serviceRadius", text)
                }
                style={styles.input}
              />
            </View>
          </View>
        </View>
        {Platform.OS !== "web" && (
          <Button
            containerStyle={{ marginBottom: 15 }}
            onPress={handleAddService}
            loading={uploading}
          >
            Save
          </Button>
        )}
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
  content: {},
  photoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCont: { flex: 1, backgroundColor: "white", padding: 15 },
  rightCont: { flex: 1 },
  imageButton: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
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
  select: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  currency: {
    position: "absolute",
    left: 10,
    top: 20,
  },
  errorText: {
    color: "red",
    marginTop: -20,
    marginBottom: 10,
  },
});
