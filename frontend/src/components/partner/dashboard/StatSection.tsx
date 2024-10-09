import React from "react";
import { Text, View, StyleSheet } from "react-native";
import StatsCard from "../StatCard";
import useDimensions from "@/src/hooks/useDimension";
import { Ionicons } from "@expo/vector-icons";

const statsData = [
  {
    title: "Active Leads",
    count: 100,
    icon: "people-outline",
    iconColor: "#009688",
  },
  {
    title: "Check-Ins",
    count: 100,
    icon: "location-outline",
    iconColor: "#8BC34A",
  },
  {
    title: "Followers",
    count: 100,
    icon: "person-add-outline",
    iconColor: "#673AB7",
  },
  {
    title: "Unread Messages",
    count: 100,
    icon: "mail-outline",
    iconColor: "#FF5722",
  },
  { title: "Likes", count: 100, icon: "heart-outline", iconColor: "#FFC107" },
];

const StatsSection: React.FC = () => {
  const { isMobile, width } = useDimensions();
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.gridContainer}>
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
        <View
          style={{
            width: !isMobile ? (width - 280) * 0.1 : (width - 50) * 0.5,
            borderColor: "#e1e1e1",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add-circle-outline" size={20} />
          <Text>Add Data</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
});

export default StatsSection;
