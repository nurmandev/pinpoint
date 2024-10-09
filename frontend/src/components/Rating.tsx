import React from "react";
import { View, Text, StyleSheet, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

interface RatingProps {
  rating: number;
  show?: boolean;
  textStyle?: TextStyle;
  maxRating?: number; // Default is 5
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  show = true,
  textStyle,
}) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = maxRating - fullStars - halfStars;
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {show && (
        <Text style={[styles.ratingText, textStyle]}>{rating.toFixed(1)}</Text>
      )}
      <View style={styles.starsContainer}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Ionicons
            key={`full-${index}`}
            name="star"
            size={16}
            color={colors.primary}
          />
        ))}
        {/* Half star */}
        {halfStars === 1 && (
          <Ionicons
            key="half"
            name="star-half"
            size={16}
            color={colors.primary}
          />
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Ionicons
            key={`empty-${index}`}
            name="star-outline"
            size={16}
            color={colors.primary}
          />
        ))}
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: "white",
  },
});
