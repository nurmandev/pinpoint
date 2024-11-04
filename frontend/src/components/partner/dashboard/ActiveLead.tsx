// ActiveLeadsCard.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { Card, Avatar, List, Text, useTheme } from "react-native-paper";
import Button from "../../Button";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";
import { imageURL } from "@/src/services/api";
import moment from "moment";
import { router } from "expo-router";
import useDimensions from "@/src/hooks/useDimension";

const ActiveLeadsCard: React.FC = () => {
  const { colors } = useTheme();
  const { addNotification } = useToastNotification();
  const { isMobile } = useDimensions();
  const { fetchPartnerLeads, updateStatus } = useLead();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchLLeads = async () => {
      try {
        const res = await fetchPartnerLeads("Active");
        setLeads(res);
      } catch (error: any) {
        addNotification(error);
      }
    };
    fetchLLeads();
  }, []);

  const approveLead = async (id: string) => {
    try {
      setApproving(true);
      const res = await updateStatus(id, { status: "Active" });
      console.log("result", res);
      //remove leadfrom leads
      setLeads(leads.filter((l) => l._id !== id));
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Active Leads"
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
            <Text>No Active Leads</Text>
          ) : (
            leads.map((lead) =>
              isMobile ? (
                <Pressable
                  onPress={() => router.push(`/leads/${lead._id}`)}
                  key={lead._id}
                  style={styles.listItem}
                >
                  <List.Item
                    title={lead.customerName}
                    description={`${lead.item.name} `}
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

                    // style={styles.listItem}
                  />
                  <Button
                    variant="outlined"
                    containerStyle={{ paddingVertical: 8, borderWidth: 0 }}
                    textStyle={{ color: colors.primary }}
                    onPress={() => approveLead(lead._id)}
                  >
                    Complete
                  </Button>
                </Pressable>
              ) : (
                <View key={lead._id} style={styles.listItem}>
                  <List.Item
                    title={lead.customerName}
                    description={`${lead.item.name} `}
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
                    // style={styles.listItem}
                  />
                  <Button
                    variant="outlined"
                    containerStyle={{ paddingVertical: 8, borderWidth: 0 }}
                    textStyle={{ color: colors.primary }}
                    onPress={() => approveLead(lead._id)}
                  >
                    Complete
                  </Button>
                </View>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // Adds a light separator line for better visual distinction on web
  },
  time: {
    fontSize: 12,
    color: "#999",
    alignSelf: "center",
  },
});

export default ActiveLeadsCard;
