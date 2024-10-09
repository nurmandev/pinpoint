import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import VideoScreen from "@/src/components/social/Video";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

interface GalleryItem {
  id: string;
  uri: string;
  isVideo?: boolean;
}

const GalleryScreen: React.FC = () => {
  const { colors } = useTheme();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
        const fileUri = await FileSystem.getContentUriAsync(asset.uri);

        return {
          id: asset.id,
          uri: fileUri,
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
            color="white"
            style={styles.playIcon}
          />
        </>
      )}
      {selectedItem?.id === item.id && <View style={styles.overlay} />}
    </TouchableOpacity>
  );

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
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Next
        </Text>
      </View>
      <View style={styles.selectedItem}>
        {selectedItem &&
          (selectedItem.isVideo ? (
            <VideoScreen videoSource={selectedItem.uri} />
          ) : (
            <Image
              source={{ uri: selectedItem.uri }}
              style={styles.mainImage}
              contentFit="cover"
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
});

export default GalleryScreen;
