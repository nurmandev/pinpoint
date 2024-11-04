import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Appbar, Menu, useTheme } from "react-native-paper";
import { Ionicons, createIconSetFromFontello } from "@expo/vector-icons";
import Delete from "@/src/components/menu/inquiry/Delete";
import { getLeadById } from "@/src/services/lead";
import { Lead } from "@/src/types/lead";
import { imageURL } from "@/src/services/api";
import moment from "moment";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { getConversationService } from "@/src/services/message";
import { useMessage } from "@/src/context/Message";

const Inquiry = () => {
  const { colors } = useTheme();
  const { addNotification } = useToastNotification();
  const { setCurrentConversation } = useMessage();
  const { id } = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [lead, setLead] = useState<Lead>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [goingToChat, setGoingToChat] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getLeadById(id as string);
        setLead(response.lead);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchLead();
  }, [id]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderOption = () => (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="ellipsis-vertical" size={25} color="gray" />
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <TouchableOpacity
        onPress={closeMenu}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <Ionicons name="pencil" size={20} />
        <Text>Modify</Text>
      </TouchableOpacity>
      <Delete />
    </Menu>
  );

  const availableOptions = [
    lead?.item?.homeService && "In-Home Service",
  ].filter(Boolean);

  const onChat = async () => {
    try {
      if (!lead?.conversationId) {
        addNotification({
          message: "Unable to start  conversation, try again later",
          error: true,
        });
        return;
      }
      setGoingToChat(true);
      const res = await getConversationService(lead.conversationId);
      console.log(res);
      setCurrentConversation(res);
      router.push("/inquiry/chat");
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setGoingToChat(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Lead Details" />
        {renderOption()}
      </Appbar.Header>
      {loading && <LoadingOverlay />}
      <ScrollView
        style={{
          paddingHorizontal: 15,
          flex: 1,
        }}
      >
        <View style={styles.selectedItem}>
          <Image
            source={{ uri: imageURL + lead?.item.images[0] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userDetail}>
          <View style={styles.name}>
            <Text style={styles.fullname}>{lead?.location.locationName}</Text>
            <Text style={styles.username}>{lead?.item.name}</Text>
          </View>
          {goingToChat ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={onChat}
              style={{
                alignItems: "center",
                padding: 5,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#e1e1e1",
                borderRadius: 40,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={20} />
              <Text style={{ fontSize: 16 }}>Chat</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.sectionText}>{lead?.item.description}</Text>

          <Text
            style={[
              styles.sectionTitle,
              { marginTop: 10, fontWeight: "bold", fontSize: 20 },
            ]}
          >
            {lead?.item?.priceType === "range"
              ? `$${lead?.item?.priceRange?.from} - $${lead?.item?.priceRange?.to}`
              : `$${lead?.item?.price}`}
          </Text>
        </View>
        {availableOptions.length > 0 && (
          <View
            style={[
              styles.section,
              { flexDirection: "row", gap: 5, alignItems: "center" },
            ]}
          >
            <Text style={{ color: "#888" }}>
              {availableOptions.join(" + ")}
            </Text>
            <Ionicons name="checkmark" size={15} />
          </View>
        )}
        <View style={styles.section}>
          {lead?.item?.options?.map((option, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 10 }}
            >
              <Text
                style={{
                  flex: 1,
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {option.optionCategory}:
              </Text>
              <Text style={{ flex: 3 }}>{option.optionName}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Retail</Text>
          <Text style={styles.sectionText}>{lead?.details}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionText, { marginBottom: 8 }]}>
            {moment(lead?.serviceRequestDate).calendar()}
          </Text>
          <Text style={styles.sectionText}>
            <Text style={styles.sectionTitle}> Urgency:</Text> Important
          </Text>
        </View>
        {lead?.reason === "Awaiting Customer Review" && (
          <Text
            onPress={() =>
              router.push({
                pathname: "/inquiry/review",
                params: {
                  id: lead?._id,
                  image: lead?.item.images[0],
                  serviceName: lead?.item.name,
                },
              })
            }
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "500",
              marginVertical: 20,
            }}
          >
            Leave a review
          </Text>
        )}
        <View style={{ height: 30, width: 10 }} />
      </ScrollView>
    </View>
  );
};

export default Inquiry;

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  selectedItem: {
    // width: WIDTH,
    height: WIDTH * 0.6,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  userDetail: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  name: {},
  username: {
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 5,
  },
  fullname: { fontSize: 24, fontWeight: "600" },
  section: {
    // marginBottom: 16,
    paddingVertical: 24,
    // padding: 16,
    borderBlockColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
});
