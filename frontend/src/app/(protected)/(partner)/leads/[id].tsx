import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import LeadsModal from "@/src/components/partner/leads/LeadModal";
import { useLocalSearchParams } from "expo-router";

const LeadDetail = () => {
  const { id } = useLocalSearchParams();
  return <LeadsModal id={id as string} />;
};

export default LeadDetail;

const styles = StyleSheet.create({});
