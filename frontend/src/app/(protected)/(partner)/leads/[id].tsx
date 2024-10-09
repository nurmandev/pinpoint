import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import LeadsModal from "@/src/components/partner/leads/LeadModal";

const LeadDetail = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <LeadsModal />
    </ScrollView>
  );
};

export default LeadDetail;

const styles = StyleSheet.create({});
