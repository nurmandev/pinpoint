import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import VideoScreen from "@/src/components/social/Video";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { useUser } from "@/src/context/User";
import { UserRole } from "@/src/types/user";
import { useLocation } from "@/src/context/Location";
import { useStory } from "@/src/context/Story";

interface GalleryItem {
  id: string;
  uri: string;
  localUri?: string;
  isVideo?: boolean;
}

const GalleryScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { locations } = useLocation();
  const { addStory } = useStory();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [next, setNext] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
      } else {
        loadGalleryItems();
      }
    };

    requestPermission();
  }, []);

  const loadGalleryItems = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      first: 21,
      sortBy: [MediaLibrary.SortBy.creationTime],
    });

    const items: GalleryItem[] = await Promise.all(
      media.assets.map(async (asset) => {
        const res = await MediaLibrary.getAssetInfoAsync(asset);

        return {
          id: asset.id,
          uri: asset.uri,
          localUri: res.localUri,
          isVideo: asset.mediaType === "video",
        };
      })
    );
    setSelectedItem(items[0]);
    setGalleryItems(items);
  };

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem?.id === item.id && {
          borderWidth: 5,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Image
        style={styles.image}
        source={item.uri}
        contentFit="cover"
        transition={1000}
      />
      {item.isVideo && (
        <>
          <Ionicons
            name="play-circle"
            size={24}
            color={colors.primary}
            style={styles.playIcon}
          />
        </>
      )}
      {selectedItem?.id === item.id && <View style={styles.overlay} />}
    </TouchableOpacity>
  );

  const handleShowNext = () => {
    if (user && user.role === UserRole.PARTNER && !location) {
      setVisible(true);
      return;
    } else {
      setNext(true);
    }
  };

  const handleSelect = (item: string) => {
    setLocation(item);
    setVisible(false);
    setNext(true);
  };

  const handleUpload = async () => {
    try {
      if (selectedItem) {
        addStory({
          content: "",
          media: [selectedItem.localUri || selectedItem.uri],
          mediaType: selectedItem.isVideo ? "video" : "image",
          location: location as string,
        });
      }
      setNext(false);
      router.back();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="white"
          onPress={() => router.back()}
        />
        {selectedItem && (
          <TouchableOpacity onPress={handleShowNext}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.selectedItem}>
        {selectedItem &&
          (selectedItem.isVideo ? (
            <VideoScreen
              videoSource={selectedItem.localUri || selectedItem.uri}
            />
          ) : (
            <Image
              source={{ uri: selectedItem.uri }}
              style={styles.mainImage}
              contentFit="contain"
            />
          ))}
        <Ionicons
          name="crop-outline"
          size={30}
          color="white"
          style={styles.cropIcon}
        />
      </View>
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryGrid}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { width: 300, padding: 20 }]}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={next}
        onRequestClose={() => setNext(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { height: HEIGHT }]}>
            {selectedItem &&
              (selectedItem.isVideo ? (
                <VideoScreen
                  videoSource={selectedItem.localUri || selectedItem.uri}
                />
              ) : (
                <Image
                  source={{ uri: selectedItem.uri }}
                  style={styles.mainImage}
                  contentFit="cover"
                />
              ))}
            <TouchableOpacity
              onPress={() => setNext(false)}
              style={styles.close}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                bottom: 30,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={handleUpload}>
                <Image
                  source={require("../../../../assets/images/icons/check_button.png")}
                  style={styles.buttonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    zIndex: 10,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    zIndex: 20,
  },
  selectedItem: {
    width: WIDTH,
    height: HEIGHT * 0.5,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  cropIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  nextIcon: {
    marginLeft: "auto",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  galleryGrid: {},
  itemContainer: {
    width: WIDTH / 3,
    height: WIDTH / 3,
    // padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.8,
  },
  playIcon: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  close: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    borderRadius: 80,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GalleryScreen;
