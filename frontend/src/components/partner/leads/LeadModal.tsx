// LeadsModal.tsx
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
  Card,
  Text,
  Avatar,
  useTheme,
  TextInput as PaperInput,
} from "react-native-paper";
import Button from "../../Button";
import { Ionicons } from "@expo/vector-icons";

interface ModalProps {}

const LeadsModal: React.FC<ModalProps> = () => {
  const { colors } = useTheme();
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>
          Service Name <Text style={styles.price}>$1500.99</Text> -{" "}
          <Text style={styles.status}>Pending</Text>
        </Text>
      </View>

      {/* Sub details */}
      <Text style={[styles.subDetails, { color: colors.primary }]}>
        Sub Category / Variant Category:{" "}
        <Text style={{ color: "black" }}>Option</Text>
      </Text>
      <Text style={styles.location}>Location Name</Text>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Image
            size={50}
            source={{ uri: "https://via.placeholder.com/50" }}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Cody Dixon</Text>
            <Text style={styles.textGray}>example@gmail.com</Text>
          </View>
        </View>
        <Text style={styles.pendingBadge}>Pending Lead</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfo}>
        <View style={styles.detail}>
          <Ionicons name="calendar-outline" color="gray" />
          <View>
            <Text style={{ color: "gray" }}>Date & Time</Text>
            <Text> MM/DD/YYYY, 09:00 AM</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Ionicons name="call-outline" color="gray" />
          <View>
            <Text style={{ color: "gray" }}>Phone</Text>
            <Text> (909) 555-1234</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Ionicons name="location-outline" color="gray" />
          <View>
            <Text style={{ color: "gray" }}>Address</Text>
            <Text> 13, NYC Boulevard</Text>
          </View>
        </View>
      </View>

      {/* Other Details */}
      <View style={styles.otherDetails}>
        <Text style={styles.sectionTitle}>Other Details</Text>
        <Text style={styles.textGray}>Urgency</Text>
        <Text style={{ marginBottom: 15 }}> Important</Text>
        <Text style={styles.textGray}>Preferred Method of Contact</Text>
        <Text style={{ marginBottom: 15 }}> Call</Text>
        <Text style={styles.textGray}>Additional Details</Text>
        <Text style={{ marginBottom: 15 }}>
          {" "}
          Hello, I’d like to ask if this service can be done in ...... Location
        </Text>
        <Text style={{ color: colors.primary, fontWeight: "500" }}>
          View attachments <Ionicons name="attach" size={16} />
        </Text>
      </View>

      {/* Message Box */}
      <Card style={styles.messageCard}>
        <View style={styles.messageHeader}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Avatar.Image
              size={30}
              source={{ uri: "https://via.placeholder.com/50" }}
            />
            <View>
              <Text style={styles.messageTitle}>Cody Dixon</Text>
              <Text style={styles.textGray}> Active</Text>
            </View>
          </View>
          <Ionicons name="close" size={20} />
        </View>
        <View style={styles.messageBody}>
          <View style={{ height: 200, alignItems: "center" }}>
            <Text style={styles.messagePrompt}>
              Send a message to Cody Dixon
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="attach" size={24} color="gray" />
            <View style={styles.inputCont}>
              <TextInput
                style={styles.input}
                placeholder="Message"
                // placeholderTextColor={"gray"}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Ionicons
                  name="send-outline"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>

      {/* Notes Section */}
      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur. Ipsum lorem lacus luctus
          mauris sed. Quam id amet feugiat vitae dignissim id arcu.
        </Text>
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
        <View style={styles.addnote}>
          <Text style={{ fontSize: 12, color: "#9f9d9d" }}>Add Note</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button variant="outlined" containerStyle={styles.declineButton}>
          Decline
        </Button>
        <Button variant="contained" containerStyle={styles.approveButton}>
          Approve
        </Button>
      </View>
    </View>
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
    // borderColor: "#f8d7da",
    backgroundColor: "white",
    flex: 1,
  },
  approveButton: {
    // backgroundColor: "#007bff",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  inputCont: {
    flex: 1,
    borderRadius: 5,
    height: "100%",
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    height: "100%",
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
});

export default LeadsModal;
