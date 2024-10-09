import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  FlatList,
  Modal,
} from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { useStory } from "@/src/context/Story";
import { useLocation } from "@/src/context/Location";
import { useUser } from "@/src/context/User";
import { UserRole } from "@/src/types/user";

const Picture = () => {
  const { addStory } = useStory();
  const { locations } = useLocation();
  const { user } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [facing, setFacing] = useState<CameraType>("back");
  const [isVideoMode, setIsVideoMode] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      requestPermission();
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation(); // Stop the current animation
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const onClose = () => {
    setVisible(false);
  };

  const handleRecord = async () => {
    try {
      if (isRecording) {
        cameraRef.current?.stopRecording();
        console.log("stop");
        setIsRecording(false);
      } else {
        if (cameraRef.current) {
          setIsRecording(true);
          startRotation();
          console.log("start");
          const video = await cameraRef.current.recordAsync();
          setIsRecording(false);
          if (video) {
            setVideo(video.uri);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopRotation();
    }
  };

  const handleCapturePhoto = async () => {
    if (cameraRef.current) {
      try {
        setCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
        if (!photo) return;
        console.log(photo.uri);
        setImage(photo.uri);
      } catch (error) {
        console.log(error);
      } finally {
        setCapturing(false);
      }
    }
  };

  const handleBack = () => {
    if (image) {
      setImage(null);
    } else if (video) {
      setVideo(null);
    } else {
      router.back();
    }
  };

  const handleSelect = (item: string) => {
    setLocation(item);
    setVisible(false);
  };

  const handleUpload = async () => {
    try {
      if (user && user.role === UserRole.PARTNER && !location) {
        setVisible(true);
        return;
      }
      if (video) {
        addStory({
          content: "",
          media: [video],
          mediaType: "video",
          location: location as string,
        });
      } else if (image) {
        addStory({
          content: "",
          media: [image],
          mediaType: "image",
          location: location as string,
        });
      }
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        mode={isVideoMode ? "video" : "picture"}
        facing={facing}
        ref={cameraRef}
      />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.background}
          resizeMode="contain"
        />
      )}
      {video && (
        <Video
          source={{ uri: video }}
          shouldPlay
          isLooping
          style={styles.background}
          resizeMode={ResizeMode.COVER}
        />
      )}
      {video || image ? (
        <Ionicons
          onPress={handleBack}
          name="close"
          size={35}
          style={styles.back}
          color="white"
        />
      ) : (
        <Ionicons
          onPress={handleBack}
          name="chevron-back"
          size={35}
          style={styles.back}
          color="white"
        />
      )}
      {!capturing && (
        <View style={styles.buttonContainer}>
          {image || video ? (
            <View style={{ width: 40, height: 40 }} />
          ) : (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/gallery")}
            >
              <Ionicons name="image-outline" size={30} color="white" />
            </TouchableOpacity>
          )}

          {image || video ? (
            <TouchableOpacity onPress={handleUpload}>
              <Image
                source={require("../../../../assets/images/icons/check_button.png")}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={isVideoMode ? handleRecord : handleCapturePhoto}
            >
              {isVideoMode ? (
                <View style={styles.buttonImage}>
                  <Animated.Image
                    source={require("../../../../assets/images/icons/video_button.png")}
                    style={[
                      { width: "100%", height: "100%" },
                      { transform: [{ rotate }] },
                    ]}
                    resizeMode="contain"
                  />
                  {!isRecording ? (
                    <Image
                      source={require("../../../../assets/images/icons/video_color.png")}
                      style={{
                        position: "absolute",
                        width: "40%",
                        height: "40%",
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.red} />
                  )}
                </View>
              ) : (
                <Image
                  source={require("../../../../assets/images/icons/camera_button.png")}
                  style={styles.buttonImage}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          )}

          {image || video ? (
            <View style={{ width: 40, height: 40 }} />
          ) : (
            <TouchableOpacity onPress={() => setIsVideoMode(!isVideoMode)}>
              {!isVideoMode ? (
                <Image
                  source={require("../../../../assets/images/icons/video_white.png")}
                  style={styles.buttonImage2}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/images/icons/camera_button.png")}
                  style={styles.buttonImage2}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close"
              size={24}
              onPress={() => setVisible(false)}
              style={{ position: "absolute", top: 4, right: 4 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              Select Location
            </Text>
            <FlatList
              data={locations}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item._id)}
                >
                  <Text style={[styles.optionText]}>{item.locationName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  back: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
  },
  captureButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
  },
  buttonImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage2: {
    width: 40,
    height: 40,
  },
  red: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
