import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import PollCard from "@/src/components/partner/poll/PollCard";
import useDimensions from "@/src/hooks/useDimension";

const Pools = () => {
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("Active Polls");
  const { isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.breadcrum}>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          Dashboard
        </Text>{" "}
        / Polls
      </Text>
      <View style={styles.headerCont}>
        <Text style={styles.heading}> Polls</Text>
      </View>
      <ScrollView style={[styles.content, { padding: isMobile ? 0 : 20 }]}>
        <View style={styles.tabs}>
          {["Active Polls (6)", "Deleted Polls"].map((item) => (
            <Text
              key={item}
              style={[
                styles.tabText,
                currentTab === item && {
                  color: colors.primary,
                  borderBottomColor: colors.primary,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setCurrentTab(item)}
            >
              {item}
            </Text>
          ))}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <PollCard key={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Pools;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  breadcrum: { marginBottom: 30 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    // padding: 15,
    borderRadius: 20,
  },
  tabs: {
    flexDirection: "row",
    // justifyContent: "space-around",
    marginVertical: 10,
    marginBottom: 30,
  },
  tabText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "500",
    color: "gray",
    flex: 1,
    textAlign: "center",
  },
});
