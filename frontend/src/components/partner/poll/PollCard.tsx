import useDimensions from "@/src/hooks/useDimension";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, useTheme } from "react-native-paper";

// Sample poll data
const pollData = [
  { answer: "Answer 1", votes: 4, percentage: "20%" },
  { answer: "Answer 2", votes: 4, percentage: "20%" },
  { answer: "Answer 3", votes: 4, percentage: "20%" },
  { answer: "Answer 4", votes: 12, percentage: "40%" },
];

const PollCard = () => {
  const { colors } = useTheme();
  const totalVotes = pollData.reduce((acc, item) => acc + item.votes, 0);
  const { width, isMobile } = useDimensions();

  return (
    <Card
      style={[
        styles.card,
        { width: !isMobile ? (width - 280) * 0.28 : width - 40 },
      ]}
    >
      {/* Location and Description */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.elevation.level1,
          },
        ]}
      >
        <Ionicons name="location-outline" size={20} />
        <Text style={styles.location}> Location Name</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, onsectetur adipiscing elit, eiusmod
          temposed do.?
        </Text>

        {/* Poll Options */}
        {pollData.map((item, index) => (
          <View key={index} style={styles.pollItem}>
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item.answer}</Text>
              <Text style={styles.votesText}>{item.votes} votes</Text>
            </View>
            <Text style={styles.percentageText}>{item.percentage}</Text>
          </View>
        ))}
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalVotesText}>
          Total Votes: {totalVotes} votes
        </Text>
        <TouchableOpacity>
          <Text style={styles.deleteText}>Delete Poll</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 10,
  },
  header: {
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  pollItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  answerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  votesText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  totalVotesText: {
    fontSize: 14,
    color: "#555",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
});

export default PollCard;
