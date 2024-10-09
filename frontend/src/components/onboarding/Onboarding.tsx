import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ImageSourcePropType,
  ViewToken,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dot from "./Dot";
import { useAuth } from "@/src/context/Auth";

interface OnboardingItem {
  id: string;
  image: ImageSourcePropType;
  header: string;
  description: string;
}

export const data: OnboardingItem[] = [
  {
    id: "1",
    image: require("../../../assets/images/slide1.png"),
    header: "Discover Local Favorites",
    description:
      "Quickly find and shop from nearby small businesses that offer Products & Services.",
  },
  {
    id: "2",
    image: require("../../../assets/images/slide2.png"),
    header: "Socialize About Your Experience",
    description:
      "Have trust in your shopping. Our Partners are rated only by Users who have made transactions with them.",
  },
  {
    id: "3",
    image: require("../../../assets/images/slide3.png"),
    header: "Shop Through Leads",
    description:
      "Submit leads to purchase Products Service from small businesses local and abroad. Communicate with available businesses to make purchasees or schedule your needed Service today!",
  },
];

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Onboarding: React.FC = () => {
  const { colors } = useTheme();
  const { completeOnboarding } = useAuth();

  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);
  const flatlistRef = useAnimatedRef<FlatList<OnboardingItem>>();

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingItem;
    index: number;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const skipButtonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [0, -50],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const nextButtonTextAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [1, 0],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [40, -500],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  const getStartedTextAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      x.value,
      [(data.length - 2) * WIDTH, (data.length - 1) * WIDTH],
      [100, -30],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.FlatList
        data={data}
        ref={flatlistRef}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={onScroll}
      />

      <View style={styles.pagination}>
        {data.map((_, i) => (
          <Dot index={i} x={x} key={i} />
        ))}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          mode="contained"
          contentStyle={{ padding: 5 }}
          uppercase
          style={{
            borderRadius: 5,
          }}
          onPress={() => {
            console.log("here");
            if (flatlistIndex.value < data.length - 1) {
              flatlistRef.current?.scrollToIndex({
                index: flatlistIndex.value + 1,
              });
            } else {
              completeOnboarding();
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Animated.View
              style={[
                nextButtonTextAnimatedStyle,
                {
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text
                style={[{ color: "white", fontWeight: "800" }]}
                numberOfLines={1}
              >
                Next
              </Text>
              <AntDesign name="arrowright" size={18} color={"white"} />
            </Animated.View>
            <Animated.Text
              style={[
                {
                  color: "white",
                  fontWeight: "800",
                  textAlign: "center",
                },
                getStartedTextAnimatedStyle,
              ]}
              numberOfLines={1}
            >
              Get Started
            </Animated.Text>
          </View>
        </Button>

        <Animated.View style={[skipButtonAnimatedStyle]}>
          <Button
            mode="text"
            contentStyle={{ padding: 5 }}
            labelStyle={{ fontWeight: "800" }}
            uppercase
            style={{
              borderRadius: 5,
            }}
            onPress={() => completeOnboarding()}
          >
            Skip
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: { flex: 1, width: WIDTH, paddingHorizontal: 20 },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: HEIGHT / 2,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    top: HEIGHT * 0.635,
    left: WIDTH * 0.4,
    position: "absolute",
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Onboarding;
