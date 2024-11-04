import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
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
import { useProduct } from "@/src/context/Product";
import { ProductData } from "@/src/services/product";
import * as ImagePicker from "expo-image-picker";
import { useLocation } from "@/src/context/Location";
import { router } from "expo-router";

const categoriesOption = [
  { label: "Clothing", value: "clothing" },
  { label: "Electronic", value: "electronic" },
  { label: "Food & Beverage", value: "Food & Beverage" },
  { label: "Jewelry", value: "Jewelry" },
];

const subCategoriesOption = [
  { label: "Shirts", value: "Shirts" },
  { label: "Shorts", value: "Shorts" },
  { label: "Jacket", value: "Jacket" },
];
const AddProduct = () => {
  const { colors } = useTheme();
  const { isMobile } = useDimensions();
  const { createNewProduct } = useProduct();
  const { locations: userLocations } = useLocation();

  // State Management
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    images: [],
    location: [],
    mainCategory: [],
    category: [],
    subCategory: [],
    options: [],
    availableOnline: false,
    ships: false,
    pickupAvailable: false,
    inShopOnly: false,
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
    images: "",
    location: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    options: "",
  });

  const [productOptions, setProductOptions] = useState<ProductData["options"]>([
    { optionCategory: "", optionName: "" },
  ]);
  const [locations, setLocations] = useState<ProductData["location"]>([""]);

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
    setProductOptions((prev) => [
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
    const updatedOptions = [...productOptions];
    updatedOptions[index][field] = value;
    setProductOptions(updatedOptions);
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  // Validate Form
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      description: "",
      price: "",
      images: "",
      location: "",
      mainCategory: "",
      category: "",
      subCategory: "",
      options: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
      valid = false;
    }

    if (!image && !image2 && image3 && image4 && image5) {
      newErrors.images = "Add at least one image";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required.";
      valid = false;
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required.";
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
  // Handle Add Product
  const handleAddProduct = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Prepare data
      const payload = {
        ...formData,
        options: productOptions,
        location: locations,
        images: [image, image2, image3, image4, image5].filter(
          (img) => img.url !== ""
        ),
      };
      setUploading(true);
      // Create new product
      await createNewProduct(payload);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        images: [],
        location: [],
        mainCategory: [],
        category: [],
        subCategory: [],
        options: [],
        availableOnline: false,
        ships: false,
        pickupAvailable: false,
        inShopOnly: false,
      });
      setImage({ url: "", name: "" });
      setImage2({ url: "", name: "" });
      setImage3({ url: "", name: "" });
      setImage4({ url: "", name: "" });
      setImage5({ url: "", name: "" });
      setProductOptions([]);
      router.back();
    } catch (error) {
      console.error("Error adding product:", error);
      // Alert.alert("Error", "Failed to add product. Please try again.");
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
            / Product
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}>Add Product</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button
                variant="outlined"
                containerStyle={{ width: 150, backgroundColor: "white" }}
              >
                Copy Product
              </Button>
              <Button
                onPress={handleAddProduct}
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
                  Copy Product
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
            {errors.images ? (
              <Text style={styles.errorText}>{errors.images}</Text>
            ) : null}

            <TextInput
              mode="outlined"
              label="Product Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              style={styles.input}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <TextInput
              mode="outlined"
              label="Product Description"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              style={{ marginBottom: 20, height: 100 }}
              multiline
              numberOfLines={3}
            />

            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}
            <View>
              <TextInput
                mode="outlined"
                label="Price"
                keyboardType="numeric"
                value={`${formData.price}`}
                onChangeText={(text) => handleInputChange("price", text)}
                style={[styles.input, { paddingLeft: 20 }]}
              />

              <FontAwesome style={styles.currency} name="dollar" size={20} />

              {errors.price ? (
                <Text style={styles.errorText}>{errors.price}</Text>
              ) : null}
            </View>
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
              <Text style={styles.photoLabel}>Product Details</Text>
              <Divider style={{ marginVertical: 20 }} />
              {isMobile && (
                <Text
                  style={[
                    { fontWeight: "600", fontSize: 16, marginBottom: 10 },
                  ]}
                >
                  Product Category
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {!isMobile && <Text style={{ flex: 1 }}>Product Category</Text>}
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
              {productOptions.map((option, index) => (
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
                <PaperButton mode="text" icon={"plus"} onPress={addOption}>
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
                <Text>Available Online</Text>
                <Checkbox.Android
                  status={formData.availableOnline ? "checked" : "unchecked"}
                  onPress={() =>
                    handleCheckboxChange(
                      "availableOnline",
                      !formData.availableOnline
                    )
                  }
                />
              </View>

              <TextInput
                mode="outlined"
                label="Product Web Url"
                value={formData.productUrl}
                onChangeText={(text) => handleInputChange("productUrl", text)}
                style={styles.input}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Product Ships</Text>
                <Checkbox.Android
                  status={formData.ships ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxChange("ships", !formData.ships)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Pick-Up Available</Text>
                <Checkbox.Android
                  status={formData.pickupAvailable ? "checked" : "unchecked"}
                  onPress={() =>
                    handleCheckboxChange(
                      "pickupAvailable",
                      !formData.pickupAvailable
                    )
                  }
                />
              </View>
              <Divider style={{ marginVertical: 20 }} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>In Shop Only</Text>
                <Checkbox.Android
                  status={formData.inShopOnly ? "checked" : "unchecked"}
                  onPress={() =>
                    handleCheckboxChange("inShopOnly", !formData.inShopOnly)
                  }
                />
              </View>
            </View>
          </View>
        </View>
        {Platform.OS !== "web" && (
          <Button
            containerStyle={{ marginBottom: 15 }}
            onPress={handleAddProduct}
            loading={uploading}
          >
            Save
          </Button>
        )}
      </ScrollView>
    </View>
  );
};

export default AddProduct;

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
    marginBottom: 25,
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
