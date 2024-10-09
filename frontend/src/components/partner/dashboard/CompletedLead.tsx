// CompletedLead.tsx
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text } from "react-native-paper";

const leads = [
  {
    id: "1",
    name: "Cody Dixon",
    service: "Service Name",
    completed: true,
    result: "Complete",
  },
  {
    id: "2",
    name: "Cody Dixon",
    service: "Service Name",
    completed: false,
    result: "User No show",
  },
  {
    id: "3",
    name: "Cody Dixon",
    service: "Service Name",
    completed: false,
    result: "Location Cancelled",
  },
  {
    id: "4",
    name: "Cody Dixon",
    service: "Service Name",
    completed: false,
    result: "User Cancel",
  },
  // Add more items if needed to test scrolling
];

const CompletedLead: React.FC = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Completed Leads"
        right={() => <Text style={styles.viewAll}>VIEW ALL</Text>}
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {leads.map((lead) => (
            <List.Item
              key={lead.id}
              title={lead.name}
              description={`${lead.service}`}
              left={() => (
                <Avatar.Image
                  size={40}
                  source={{ uri: "https://via.placeholder.com/40" }}
                />
              )}
              right={() => (
                <Text
                  style={[
                    styles.time,
                    { color: lead.completed ? "green" : "red" },
                  ]}
                >
                  {lead.result}
                </Text>
              )}
              style={styles.listItem}
            />
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "white",
    flex: 1,
  },
  viewAll: {
    color: "#007AFF",
    marginRight: 10,
    fontSize: 14,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // Adds a light separator line for better visual distinction on web
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default CompletedLead;
