// PendingLeadsCard.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text } from "react-native-paper";
import Modal from "../../modals/modal";
import LeadsModal from "../leads/LeadModal";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";
import moment from "moment";
import { imageURL } from "@/src/services/api";
import { router } from "expo-router";
import useDimensions from "@/src/hooks/useDimension";

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
  const { addNotification } = useToastNotification();
  const { fetchPartnerLeads } = useLead();
  const [leads, setLeads] = useState<Lead[]>([]);
  const { isMobile } = useDimensions();

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        const res = await fetchPartnerLeads("Pending");
        setLeads(res);
      } catch (error: any) {
        addNotification(error);
      }
    };
    fetchLLeads();
  }, []);
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Pending Leads"
        right={() => (
          <Text onPress={() => router.push("/leads")} style={styles.viewAll}>
            VIEW ALL
          </Text>
        )}
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {leads.length <= 0 ? (
            <Text>No Pendiing Leads</Text>
          ) : (
            leads.map((lead) =>
              isMobile ? (
                <List.Item
                  key={lead._id}
                  title={lead.customerName}
                  description={`${lead.service.name}`}
                  left={() => (
                    <Avatar.Image
                      size={40}
                      source={{ uri: imageURL + lead.service.images[0] }}
                    />
                  )}
                  right={() => (
                    <Text style={styles.time}>
                      {moment(lead.createdAt).fromNow()}
                    </Text>
                  )}
                  style={styles.listItem}
                  onPress={() => router.push(`/leads/${lead._id}`)}
                />
              ) : (
                <Modal
                  key={lead._id}
                  button={
                    <List.Item
                      title={lead.customerName}
                      description={`${lead.service.name}`}
                      left={() => (
                        <Avatar.Image
                          size={40}
                          source={{ uri: imageURL + lead.service.images[0] }}
                        />
                      )}
                      right={() => (
                        <Text style={styles.time}>
                          {moment(lead.createdAt).fromNow()}
                        </Text>
                      )}
                      style={styles.listItem}
                    />
                  }
                >
                  {(close) => <LeadsModal />}
                </Modal>
              )
            )
          )}
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
