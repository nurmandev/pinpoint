// HeaderStories.tsx
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewToken,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useStory } from "@/src/context/Story";
import { useUser } from "@/src/context/User";
import { IStory } from "@/src/types/story";
import { Image } from "expo-image";
import { ResizeMode, Video } from "expo-av";
import { imageURL } from "@/src/services/api";

const HeaderStories = () => {
  const { stories, uploading, openViewer } = useStory();
  const { user } = useUser();

  const renderItem = ({ item, index }: { item: IStory; index: number }) => {
    const lastStory = item.stories[item.stories.length - 1];
    return (
      <TouchableOpacity
        onPress={() => openViewer(index)}
        style={styles.storyItem}
      >
        {lastStory?.media?.type === "image" ? (
          <Image
            source={{ uri: imageURL + lastStory?.media?.url }}
            style={styles.storyImage}
          />
        ) : (
          <Video
            source={{ uri: imageURL + lastStory?.media?.url }}
            style={styles.storyImage}
            resizeMode={ResizeMode.COVER}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Stories</Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <TouchableOpacity
            onPress={() => router.push("/camera")}
            style={styles.storyItem}
          >
            <View style={styles.addStoryContainer}>
              <Image
                source={{ uri: imageURL + user?.avatarUrl }}
                style={styles.storyImage}
              />
              <View style={styles.overlay} />
              <Ionicons style={styles.icon} name="add" size={24} color="red" />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() =>
          uploading ? <ActivityIndicator size={50} /> : null
        }
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HeaderStories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  title: { fontWeight: "500", paddingBottom: 10 },
  storyItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  addStoryContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ff6347",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: 0.2,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "red",
  },
  icon: {
    position: "absolute",
  },
});
