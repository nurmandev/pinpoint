import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image } from "react-native";
import { Video } from "expo-av";
import ReelItem from "@/src/components/social/ReelItem";
import { useStory } from "@/src/context/Story";
import { viewStoryService } from "@/src/services/story";

const Reel = () => {
  const { getSortedStoryMedia, fetchStories } = useStory();
  const videoRefs = useRef<(Video | Image)[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlayPause = (videoRef: Video | Image) => {
    if (videoRef instanceof Image) return;
    if (isPlaying) {
      videoRef.pauseAsync();
    } else {
      videoRef.playAsync();
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);

    setTimeout(() => {
      setShowControls(false);
    }, 2000); // Hide controls after 2 seconds
  };

  useEffect(() => {
    return () => {
      fetchStories();
    };
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    videoRefs.current.forEach((media, index) => {
      if (media) {
        const isViewable = viewableItems.some(
          (item: any) => item.index === index
        );

        if ("playAsync" in media && "pauseAsync" in media) {
          if (isViewable) {
            media.playAsync();
            setIsPlaying(true);
          } else {
            media.pauseAsync();
          }
        }

        const viewableItem = viewableItems.find(
          (item: any) => item.index === index
        );
        if (viewableItem && isViewable) {
          const itemId = viewableItem.item._id;
          viewStoryService(itemId);
        }
      }
    });
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  });

  return (
    <FlatList
      data={getSortedStoryMedia("66fb6135020ae25804306aa9")}
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => (
        <ReelItem
          key={item._id}
          item={item}
          index={index}
          videoRefs={videoRefs}
          isPlaying={isPlaying}
          showControls={showControls}
          togglePlayPause={togglePlayPause}
        />
      )}
      pagingEnabled
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Reel;
