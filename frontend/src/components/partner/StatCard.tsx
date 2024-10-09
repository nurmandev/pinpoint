import React from "react";
import { View, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { Card, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface StatsCardProps {
  title: string;
  count: number;
  icon: string;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  count,
  icon,
  iconColor,
}) => {
  const { width } = useWindowDimensions();
  return (
    <Card
      style={[
        styles.card,
        {
          width:
            Platform.OS === "web" && width > 768
              ? (width - 280) * 0.16
              : (width - 50) * 0.5,
        },
      ]}
    >
      <Card.Content style={[styles.content, { borderLeftColor: iconColor }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>{count}</Text>
        </View>
        <View
          style={[styles.iconContainer, { backgroundColor: iconColor + "20" }]}
        >
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 5,
    gap: 10,
    justifyContent: "space-between",
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingLeft: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: "gray",
  },
  count: {
    fontSize: 30,
    fontWeight: "medium",
    flexWrap: "nowrap",
  },
});

export default StatsCard;
