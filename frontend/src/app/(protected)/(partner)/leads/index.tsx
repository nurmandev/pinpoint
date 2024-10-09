import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useDimensions from "@/src/hooks/useDimension";
import LeadsMobile from "@/src/components/partner/leads/main/mobile";
import LeadsDesktop from "@/src/components/partner/leads/main/desktop";

const Leads = () => {
  const { isMobile } = useDimensions();
  return isMobile ? <LeadsMobile /> : <LeadsDesktop />;
};

export default Leads;

const styles = StyleSheet.create({});
