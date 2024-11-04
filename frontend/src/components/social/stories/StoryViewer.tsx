import React, { useCallback, useRef, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Animated } from "react-native";
import { IStory } from "@/src/types/story";
import StoryComponent from "./StatusView";
import { useStory } from "@/src/context/Story";
import useDimensions from "@/src/hooks/useDimension";

interface StoryViewerProps {}

const StoryViewer: React.FC<StoryViewerProps> = () => {
  const {
    stories,
    isViewerVisible: isVisible,
    opacityAnim,
    scaleAnim,
    startIndex,
    closeViewer,
  } = useStory();
  const { width } = useDimensions();
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleNextUserStories = () => {
    if (currentIndex < stories.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      closeViewer();
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Consider item "viewed" if it's at least 50% visible
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    },
    [currentIndex]
  );
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: startIndex,
          animated: false,
        });
        setCurrentIndex(startIndex);
      }, 0);
    }
  }, [startIndex, isVisible]);

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = useCallback((info: { index: any }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 500);
  }, []);

  return (
    isVisible && (
      <Animated.View
        style={[
          styles.fullScreenViewer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <FlatList
          ref={flatListRef}
          data={stories}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return (
              <StoryComponent
                story={item}
                isActive={index === currentIndex}
                onFinishStory={handleNextUserStories}
              />
            );
          }}
          pagingEnabled
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          decelerationRate="fast"
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </Animated.View>
    )
  );
};

export default StoryViewer;

const styles = StyleSheet.create({
  fullScreenViewer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
  },
});
