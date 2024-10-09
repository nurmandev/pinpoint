import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import PollCard from "@/src/components/partner/poll/PollCard";
import useDimensions from "@/src/hooks/useDimension";
import Button from "@/src/components/Button";

const Pools = () => {
  const { colors } = useTheme();
  const [selected, setSelected] = useState("Active Polls");
  const { isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      <ScrollView style={[styles.content, { padding: isMobile ? 10 : 20 }]}>
        <View style={styles.buttonGroup}>
          <Button
            variant="outlined"
            onPress={() => setSelected("Active Polls")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor:
                  selected === "Active Polls" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  {
                    color:
                      selected === "Active Polls" ? colors.primary : "black",
                  },
                ]}
              >
                Active Polls
              </Text>
            </View>
          </Button>
          <Button
            variant="outlined"
            onPress={() => setSelected("Deleted Polls")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor:
                  selected === "Deleted Polls" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  {
                    color:
                      selected === "Deleted Polls" ? colors.primary : "black",
                  },
                ]}
              >
                Deleted Polls
              </Text>
            </View>
          </Button>
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
    marginTop: 5,
    padding: 10,
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
  buttonGroup: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
  },
  itemButton: {
    backgroundColor: "white",
    flex: 1,
  },
  itemButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemButtonText: {
    fontSize: 20,
  },
});
