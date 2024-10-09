// PendingLeadsCard.tsx
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text } from "react-native-paper";
import Modal from "../../modals/modal";
import LeadsModal from "../leads/LeadModal";

const leads = [
  {
    id: "1",
    name: "Cody Dixon",
    service: "Service Name",
    time: "1 min ago",
    location: "Location Name",
  },
  {
    id: "2",
    name: "Cody Dixon",
    service: "Service Name",
    time: "5 min ago",
    location: "Location Name",
  },
  {
    id: "3",
    name: "Cody Dixon",
    service: "Service Name",
    time: "1 hour ago",
    location: "Location Name",
  },
  {
    id: "4",
    name: "Cody Dixon",
    service: "Service Name",
    time: "2 hours ago",
    location: "Location Name",
  },
  // Add more items if needed to test scrolling
];

const PendingLeadsCard: React.FC = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Pending Leads"
        right={() => <Text style={styles.viewAll}>VIEW ALL</Text>}
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {leads.map((lead) => (
            <Modal
              key={lead.id}
              button={
                <List.Item
                  title={lead.name}
                  description={`${lead.service}`}
                  left={() => (
                    <Avatar.Image
                      size={40}
                      source={{ uri: "https://via.placeholder.com/40" }}
                    />
                  )}
                  right={() => <Text style={styles.time}>{lead.time}</Text>}
                  style={styles.listItem}
                />
              }
            >
              <LeadsModal />
            </Modal>
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
    color: "#999",
    alignSelf: "center",
  },
});

export default PendingLeadsCard;
