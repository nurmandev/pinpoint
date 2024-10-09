import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av"; // For video playback
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";

const galleryItems = [
  {
    id: "1",
    uri: require("../../../../../assets/images/feeds/feed2.png"),
    isVideo: false,
  },
  {
    id: "2",
    uri: require("../../../../../assets/images/feeds/feed1.png"),
    isVideo: false,
  },
  {
    id: "4",
    uri: require("../../../../../assets/images/product.png"),
    isVideo: false,
  },
  {
    id: "3",
    uri: require("../../../../../assets/videos/feed2.mp4"),
    isVideo: true,
  },
];

const Pictures = () => {
  const { colors } = useTheme();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderGalleryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem?.id === item.id && {
          borderWidth: 5,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => handleItemPress(item)}
    >
      <Image
        style={styles.image}
        source={item.uri}
        contentFit="cover"
        transition={1000}
      />
      {item.isVideo && (
        <Ionicons
          name="play-circle"
          size={24}
          color="white"
          style={styles.playIcon}
        />
      )}
      {selectedItem?.id === item.id && <View style={styles.overlay} />}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="The Burger Place" />
      </Appbar.Header>
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryGrid}
      />

      {/* Modal for displaying selected image/video */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>

          {selectedItem?.isVideo ? (
            <Video
              source={selectedItem?.uri}
              style={styles.modalContent}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          ) : (
            <Image
              source={selectedItem?.uri}
              style={styles.modalContent}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  galleryGrid: {},
  itemContainer: {
    width: WIDTH / 3,
    height: WIDTH / 3,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "90%",
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 30,
    zIndex: 1,
  },
});

export default Pictures;
