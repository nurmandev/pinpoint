// LeadsModal.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  Card,
  Text,
  Avatar,
  useTheme,
  TextInput as PaperInput,
  ActivityIndicator,
} from "react-native-paper";
import Button from "../../../Button";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useMessage } from "@/src/context/Message";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { addNoteToLead, getLeadById } from "@/src/services/lead";
import { Lead } from "@/src/types/lead";
import { useLocalSearchParams } from "expo-router";
import { imageURL } from "@/src/services/api";
import moment from "moment";
import { getConversationService } from "@/src/services/message";
import { useUser } from "@/src/context/User";
import Chat from "./chat";
import Modal from "@/src/components/modals/modal";
import { useLead } from "@/src/context/Lead";
import Complete from "./Complete";
import Modify from "./Modify";
import Decline from "./Decline";

interface ModalProps {
  onClose?: () => void;
  id: string;
}

const LeadsModal: React.FC<ModalProps> = ({ id, onClose }) => {
  const { colors } = useTheme();
  const { addLeadNote, fetchLeadById, updateStatus } = useLead();
  const [note, setNote] = useState("");
  const { addNotification } = useToastNotification();
  const { setCurrentConversation, messages } = useMessage();
  const [lead, setLead] = useState<Lead>();
  const [loading, setLoading] = useState(true);
  const [addingNote, setAddingNote] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await fetchLeadById(id as string);
        setLead(response);
        setEditNote(!response.note);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error.message, error: true });
      }
    };

    fetchLead();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (!lead) return;
        if (!lead?.conversationId) {
          addNotification({
            message: "Unable to start  conversation, try again later",
            error: true,
          });
          return;
        }
        const res = await getConversationService(lead.conversationId);
        setCurrentConversation(res);
        // router.push("/inquiry/chat");
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    fetchConversation();

    return () => {
      setCurrentConversation(null);
    };
  }, [lead]);

  const handleAddNote = async () => {
    try {
      if (!lead?._id) return;
      if (note === "") return;
      setAddingNote(true);
      const res = await addLeadNote(lead?._id, note);
      setEditNote(false);
      setLead({ ...lead, note: res.note });
      console.log(res);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setAddingNote(false);
    }
  };

  const handleEditNote = () => {
    setEditNote(true);
    setNote(lead?.note || "");
  };

  const approveLead = async () => {
    try {
      setApproving(true);
      const res = await updateStatus(lead!._id, { status: "Active" });
      console.log("result", res);
      setLead(res);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.serviceTitle}>
            {lead?.item.name}{" "}
            <Text style={styles.price}>
              {" "}
              {lead?.modifyPrice
                ? `$${lead.modifyPrice}`
                : lead?.item?.priceType === "range"
                ? `$${lead?.item?.priceRange?.from} - $${lead?.item?.priceRange?.to}`
                : `$${lead?.item?.price}`}
            </Text>{" "}
            -{" "}
            <Text
              style={[
                styles.status,
                {
                  color:
                    lead?.status === "Active"
                      ? colors.primary
                      : lead?.status === "Complete"
                      ? "green"
                      : "#f39c12",
                },
              ]}
            >
              {lead?.status}{" "}
              <Text>{lead?.modifyPrice ? " - Modify" : null}</Text>
            </Text>
          </Text>
        </View>

        {/* Sub details */}
        <Text style={[styles.subDetails, { color: colors.primary }]}>
          Sub Category / Variant Category:{" "}
          <Text style={{ color: "black" }}>Option</Text>
        </Text>
        <Text style={styles.location}>{lead?.location.locationName}</Text>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              size={50}
              source={{ uri: imageURL + lead?.user.avatarUrl }}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{lead?.customerName}</Text>
              <Text style={styles.textGray}>{lead?.email}</Text>
            </View>
          </View>
          <Text style={styles.pendingBadge}>{lead?.status} Lead</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <View style={styles.detail}>
            <Ionicons name="calendar-outline" color="gray" />
            <View>
              <Text style={{ color: "gray" }}>Date & Time</Text>
              <Text>
                {" "}
                {moment(
                  lead?.modifyDate ? lead.modifyDate : lead?.serviceRequestDate
                ).calendar()}
              </Text>
            </View>
          </View>
          {lead?.phone && (
            <View style={styles.detail}>
              <Ionicons name="call-outline" color="gray" />
              <View>
                <Text style={{ color: "gray" }}>Phone</Text>
                <Text> {lead?.phone}</Text>
              </View>
            </View>
          )}
          {lead?.address && (
            <View style={styles.detail}>
              <Ionicons name="location-outline" color="gray" />
              <View>
                <Text style={{ color: "gray" }}>Address</Text>
                <Text> {lead?.address}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Other De3tails */}
        <View style={styles.otherDetails}>
          <Text style={styles.sectionTitle}>Other Details</Text>
          <Text style={styles.textGray}>Urgency</Text>
          <Text style={{ marginBottom: 15 }}> Important</Text>
          {lead?.contactMethod && (
            <>
              <Text style={styles.textGray}>Preferred Method of Contact</Text>
              <Text style={{ marginBottom: 15 }}> {lead?.contactMethod}</Text>
            </>
          )}
          <Text style={styles.textGray}>Additional Details</Text>
          <Text style={{ marginBottom: 15 }}>{lead?.details}</Text>
          {lead?.uploadedMedia && lead.uploadedMedia.length > 0 && (
            <Modal
              button={
                <Text style={{ color: colors.primary, fontWeight: "500" }}>
                  View attachments <Ionicons name="attach" size={16} />
                </Text>
              }
            >
              {() => (
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {lead!.uploadedMedia!.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageURL + image }}
                      style={{ width: 100, height: 100 }}
                    />
                  ))}
                </View>
              )}
            </Modal>
          )}
        </View>

        <Chat status={lead?.status} />

        {/* Notes Section */}
        <View style={styles.notesSection}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={styles.sectionTitle}>Notes</Text>
            {lead?.note && lead?.status !== "Complete" && (
              <Feather
                name="edit"
                onPress={handleEditNote}
                size={16}
                style={{ marginBottom: 5 }}
              />
            )}
          </View>
          {editNote && lead?.status !== "Complete" ? (
            <>
              <PaperInput
                mode="outlined"
                label="Notes"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                maxLength={100}
                style={styles.noteInput}
              />
              <Text style={styles.charCount}>{note.length}/100 characters</Text>
              <Pressable
                disabled={addingNote}
                onPress={handleAddNote}
                style={styles.addnote}
              >
                {addingNote ? (
                  <ActivityIndicator size={10} />
                ) : (
                  <Text style={{ fontSize: 12, color: "#9f9d9d" }}>
                    Add Note
                  </Text>
                )}
              </Pressable>
            </>
          ) : (
            <Text>{lead?.note}</Text>
          )}
        </View>

        {/* Action Buttons */}
        {lead?.status === "Pending" &&
          ((lead.item as any).type === "Service" ? (
            <View style={styles.actionButtons}>
              <Modal
                button={
                  <Button
                    variant="outlined"
                    containerStyle={[styles.declineButton]}
                    disabled
                  >
                    Decline
                  </Button>
                }
                buttonStyle={{ flex: 1 }}
              >
                {(close) => (
                  <Decline close={close} id={lead!._id} setLead={setLead} />
                )}
              </Modal>
              <Button
                onPress={approveLead}
                variant="contained"
                containerStyle={styles.approveButton}
                loading={approving}
              >
                Approve
              </Button>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <Modal
                button={
                  <Button
                    variant="outlined"
                    containerStyle={[styles.declineButton]}
                  >
                    Pending Sale
                  </Button>
                }
                buttonStyle={{ flex: 1 }}
              >
                {(close) => <></>}
              </Modal>
              <Button
                // onPress={approveLead}
                variant="contained"
                containerStyle={styles.approveButton}
                loading={approving}
              >
                Complete
              </Button>
            </View>
          ))}

        {lead?.status === "Active" && (
          <View style={styles.actionButtons}>
            <Modal
              button={
                <Button
                  variant="outlined"
                  containerStyle={[styles.declineButton]}
                  disabled
                >
                  Modify
                </Button>
              }
              buttonStyle={{ flex: 1 }}
            >
              {(close) => (
                <Modify close={close} id={lead!._id} setLead={setLead} />
              )}
            </Modal>
            <Modal
              button={
                <Button
                  variant="contained"
                  containerStyle={[
                    { backgroundColor: colors.primary, flex: 1 },
                  ]}
                  loading={approving}
                  disabled
                >
                  Complete
                </Button>
              }
              buttonStyle={{ flex: 1 }}
            >
              {(close) => (
                <Complete close={close} id={lead!._id} setLead={setLead} />
              )}
            </Modal>
          </View>
        )}
        {lead?.status === "Complete" && (
          <View style={styles.actionButtons}>
            <Button
              // onPress={completeLead}
              variant="contained"
              containerStyle={styles.approveButton}
              loading={approving}
            >
              Print
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: { paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceTitle: {
    // fontSize: 1,
    color: "gray",
  },
  price: {
    color: "#000",
    fontSize: 18,
    // fontWeight: "500",
  },
  status: {
    color: "#f39c12",
    // fontWeight: "500",
  },
  subDetails: {
    marginVertical: 10,
    // fontWeight: "500",
    fontSize: 13,
  },
  location: {
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    padding: 10,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  textGray: {
    color: "#666",
  },
  pendingBadge: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    borderColor: "gray",
    color: "gray",
    fontSize: 12,
  },
  contactInfo: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  detail: { flexDirection: "row", alignItems: "flex-start", gap: 5 },
  otherDetails: {
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageCard: {
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  messageTitle: {
    flex: 1,
    fontWeight: "bold",
    marginLeft: 5,
  },
  messageBody: {
    padding: 10,
  },
  messagePrompt: {
    marginBottom: 5,
    color: "#666",
  },
  notesSection: {
    marginVertical: 10,
  },
  noteInput: {
    marginTop: 5,
    paddingBottom: 30,
    // paddingTop: 10,
  },
  charCount: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#9f9d9d",
    position: "absolute",
    bottom: 4,
    left: 8,
    fontSize: 12,
  },
  addnote: {
    position: "absolute",
    bottom: 4,
    right: 4,
    borderWidth: 1,
    borderColor: "#9f9d9d",
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  declineButton: {
    borderColor: "black",
    backgroundColor: "white",
  },
  approveButton: {
    // backgroundColor: "#007bff",
    flex: 1,
  },
});

export default LeadsModal;
