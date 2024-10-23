import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import StatsCard from "../StatCard";
import useDimensions from "@/src/hooks/useDimension";
import { Ionicons } from "@expo/vector-icons";
import Modal from "../../modals/modal";
import AddData from "./AddData";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";

export interface StatsData {
  title: string;
  count: number;
  icon: string;
  iconColor: string;
  id: number;
}

const StatsSection: React.FC = () => {
  const { isMobile, width } = useDimensions();
  const { addNotification } = useToastNotification();
  const { fetchPartnerLeads } = useLead();
  const [leads, setLeads] = useState<Lead[]>([]);
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

  useEffect(() => {
    // update lead stat
    const leadStatIndex = statsData.findIndex((lead) => lead.id === 1);
    if (leadStatIndex !== -1) {
      statsData[leadStatIndex].count = leads.length;
    }
  }, [leads]);

  const [statsData, setStatsData] = useState<StatsData[]>([
    {
      title: "Active Leads",
      count: leads.length,
      icon: "people-outline",
      iconColor: "#009688",
      id: 1,
    },
    {
      title: "Check-Ins",
      count: 0,
      icon: "location-outline",
      iconColor: "#8BC34A",
      id: 2,
    },
    {
      title: "Followers",
      count: 0,
      icon: "person-add-outline",
      iconColor: "#673AB7",
      id: 3,
    },
    {
      title: "Unread Messages",
      count: 0,
      icon: "mail-outline",
      iconColor: "#FF5722",
      id: 4,
    },
    {
      title: "Likes",
      count: 0,
      icon: "heart-outline",
      iconColor: "#FFC107",
      id: 5,
    },
  ]);

  const onSave = (value: StatsData[]) => {
    setStatsData(value);
  };
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
        <Modal
          button={
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
                // height: "100%",
                flex: 1,
              }}
            >
              <Ionicons name="add-circle-outline" size={20} />
              <Text>Add Data</Text>
            </View>
          }
        >
          {(close) => (
            <AddData onClose={close} statsData={statsData} onSave={onSave} />
          )}
        </Modal>
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
