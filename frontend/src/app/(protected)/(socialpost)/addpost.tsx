import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Image } from "expo-image";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import Select from "@/src/components/Select";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import * as ImagePicker from "expo-image-picker";
import { usePost } from "@/src/context/Post";
import { useLocation } from "@/src/context/Location";
import { ResizeMode, Video } from "expo-av";
import { useUser } from "@/src/context/User";
import { UserRole } from "@/src/types/user";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const AddPost = () => {
  const { createNewPost } = usePost();
  const { user } = useUser();
  const { loadUserLocations, locations } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState<string>(""); // To hold post description
  const [selectedLocation, setSelectedLocation] = useState<string>(""); // To hold selected location
  const [distance, setDistance] = useState<number>(0);
  const [creatingPost, setCreatingPost] = useState(false);
  const [cropData, setCropData] = useState({
    top: 0,
    left: 0,
    width: WIDTH - 40,
    height: HEIGHT / 2,
  });
  const { colors } = useTheme();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (user?.role === UserRole.PARTNER) {
          setLoading(true);
          await loadUserLocations();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setImages(result.assets);
      // setIsModalVisible(true);
    }
  };

  const cropImage = () => {
    setIsModalVisible(false);
    // Apply the crop using cropData
  };

  const handlePost = async () => {
    if (!selectedLocation || (!description && images.length < 1)) return;
    const postData = {
      content: description,
      media: images.map((image) => ({
        url: image.uri,
        name: image.fileName as string,
      })),
      location: selectedLocation,
    };

    try {
      setCreatingPost(true);
      await createNewPost(postData);
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setCreatingPost(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Create Social Post" />
      </Appbar.Header>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {images.length > 0 && (
            <View>
              {images[0].type === "image" ? (
                <Image
                  style={styles.mediaBackground}
                  source={{ uri: images[0].uri }}
                  contentFit="cover"
                  transition={1000}
                />
              ) : (
                <Video
                  // ref={video}
                  source={{ uri: images[0].uri }}
                  style={styles.mediaBackground}
                  isLooping
                  shouldPlay
                  resizeMode={ResizeMode.COVER}
                />
              )}
              <View
                style={{
                  backgroundColor: colors.primary,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 15,
                  right: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {images.length}
                </Text>
              </View>
            </View>
          )}
          {user?.role === "partner" && (
            <>
              <Text style={{ fontSize: 18, marginVertical: 5 }}>
                Select Location
              </Text>
              <Select
                options={locations.map((location) => ({
                  label: location.locationName,
                  value: location._id,
                }))}
                selectedValue={selectedLocation}
                onValueChange={(value) => setSelectedLocation(value as string)}
                placeholder="Location Name"
                containerStyle={{ marginBottom: 15 }}
              />
            </>
          )}
          <Text style={{ fontSize: 18, marginVertical: 5 }}>Description</Text>
          <TextInput
            inputStyle={styles.textinput}
            multiline={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
            numberOfLines={4}
          />
          <TouchableOpacity onPress={pickImage} style={styles.uploadSection}>
            <Ionicons name="cloud-upload-outline" size={30} />
            <Text style={{ fontSize: 18, marginVertical: 5 }}>
              Upload Photo/VIDEO
            </Text>
          </TouchableOpacity>
          <Button
            containerStyle={{ marginTop: 15 }}
            onPress={handlePost}
            loading={creatingPost}
            disabled={
              creatingPost ||
              !selectedLocation ||
              (!description && images.length < 1)
            }
          >
            Post
          </Button>
        </ScrollView>
      )}

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          // onPressOut={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
                borderBottomWidth: 1,
                paddingBottom: 10,
                borderBottomColor: "#e1e1e1",
                padding: 16,
              }}
            >
              <Ionicons
                onPress={() => setIsModalVisible(false)}
                name="chevron-back"
                size={24}
              />
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Edit Image
              </Text>
              <View />
            </View>
            <View style={{ paddingHorizontal: 16, paddingBottom: 25 }}>
              {image && (
                <View>
                  <Image
                    style={styles.editImage}
                    source={{ uri: image }}
                    contentFit="cover"
                    transition={1000}
                  />
                  {/* <View
                    style={[
                      styles.cropArea,
                      {
                        top: cropData.top,
                        left: cropData.left,
                        width: cropData.width,
                        height: cropData.height,
                      },
                    ]}
                  /> */}
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="minus" size={20} color={colors.primary} />
                  <MultiSlider
                    values={[distance]}
                    sliderLength={WIDTH / 3}
                    onValuesChange={(values) =>
                      setDistance(values as unknown as number)
                    }
                    min={0}
                    max={20}
                    step={1}
                    selectedStyle={{
                      backgroundColor: colors.primary,
                    }}
                    unselectedStyle={{
                      backgroundColor: "#e5e7eb",
                    }}
                    markerStyle={{
                      backgroundColor: colors.primary,
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                    }}
                    containerStyle={{ alignSelf: "center" }}
                  />
                  <Ionicons name="add" size={20} color={colors.primary} />
                </View>
                <Button
                  containerStyle={{ width: 100, paddingVertical: 10 }}
                  onPress={cropImage}
                >
                  Crop
                </Button>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  content: { padding: 20 },
  mediaBackground: {
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  editImage: {
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  cropArea: {
    borderWidth: 2,
    borderColor: "red",
    position: "absolute",
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#fff",
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
  textinput: { height: 100, paddingVertical: 10 },
});
