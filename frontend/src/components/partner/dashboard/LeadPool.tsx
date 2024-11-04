// LeadPool.tsx
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import useDimensions from "@/src/hooks/useDimension";
import { imageURL } from "@/src/services/api";
import { Lead } from "@/src/types/lead";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text } from "react-native-paper";
import Modal from "../../modals/modal";
import LeadsModal from "../leads/LeadModal";

const LeadPool: React.FC = () => {
  const { addNotification } = useToastNotification();
  const { fetchPartnerLeads } = useLead();
  const { isMobile } = useDimensions();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        const res = await fetchPartnerLeads("Pool");
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
        title="Lead Pool"
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
            <Text>No Pool Leads</Text>
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
                    <Text style={styles.time}>
                      {moment(lead.createdAt).fromNow()}
                    </Text>
                  )}
                  style={styles.listItem}
                  onPress={() => router.push(`/leads/${lead._id}`)}
                />
              ) : (
                <Modal
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
                        <Text style={styles.time}>
                          {moment(lead.createdAt).fromNow()}
                        </Text>
                      )}
                      style={styles.listItem}
                    />
                  }
                  key={lead._id}
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

export default LeadPool;
