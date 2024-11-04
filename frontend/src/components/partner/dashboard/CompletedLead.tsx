// CompletedLead.tsx
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import useDimensions from "@/src/hooks/useDimension";
import { imageURL } from "@/src/services/api";
import { Lead } from "@/src/types/lead";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text } from "react-native-paper";
import Modal from "../../modals/modal";
import LeadsModal from "../leads/LeadModal";

const CompletedLead: React.FC = () => {
  const { addNotification } = useToastNotification();
  const { isMobile } = useDimensions();
  const { fetchPartnerLeads } = useLead();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        const res = await fetchPartnerLeads("Complete");
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
        title="Completed Leads"
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
            <Text>No Completed Leads</Text>
          ) : (
            leads.map((lead) =>
              isMobile ? (
                <List.Item
                  key={lead._id}
                  title={lead.customerName}
                  description={`${lead.item.name}`}
                  left={() => (
                    <Avatar.Image
                      size={40}
                      source={{ uri: imageURL + lead.item.images[0] }}
                    />
                  )}
                  right={() => (
                    <Text
                      style={[
                        styles.time,
                        { color: lead.reason === "Complete" ? "green" : "red" },
                      ]}
                    >
                      {lead.reason}
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
                      description={`${lead.item.name}`}
                      left={() => (
                        <Avatar.Image
                          size={40}
                          source={{ uri: imageURL + lead.item.images[0] }}
                        />
                      )}
                      right={() => (
                        <Text
                          style={[
                            styles.time,
                            {
                              color:
                                lead.reason === "Complete" ? "green" : "red",
                            },
                          ]}
                        >
                          {lead.reason}
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
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default CompletedLead;
