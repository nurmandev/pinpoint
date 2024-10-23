import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";

interface Props {
  close: () => void;
  id: string;
  setLead: (data: Lead) => void;
}
const Decline: React.FC<Props> = ({ close, id, setLead }) => {
  const { addNotification } = useToastNotification();
  const { updateStatus } = useLead();

  const [approving, setApproving] = useState(false);
  const [reason, setReason] = useState("");

  const declineLead = async () => {
    try {
      if (!reason) {
        addNotification({ message: "Select a reason", error: true });
        return;
      }
      setApproving(true);
      const res = await updateStatus(id, {
        status: "Complete",
        reason: "Location Declined",
      });
      console.log("result", res);
      setLead(res);
      addNotification({ message: "Lead marked as Decline" });
      close();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Decline Request</Text>
      <Text style={{ marginBottom: 10 }}>
        Let this customer know your reason for declining the request
      </Text>

      {["Reason 1", "Reason 2", "Reason 3", "Reason 4"].map((item: any) => (
        <TouchableOpacity
          key={item}
          style={styles.option}
          onPress={() => setReason(item)}
        >
          <Checkbox.Android
            status={reason === item ? "checked" : "unchecked"}
          />
          <Text style={[styles.optionText]}>{item}</Text>
        </TouchableOpacity>
      ))}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginVertical: 10,
        }}
      >
        <Ionicons name="warning-outline" color="#E79C44" size={20} />
        <Text style={{ color: "#E79C44" }}>This action cannot be undone</Text>
      </View>

      <Button onPress={declineLead} loading={approving}>
        Submit
      </Button>
    </View>
  );
};

export default Decline;

const styles = StyleSheet.create({
  title: { fontSize: 24, marginBottom: 5, fontWeight: "500" },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#626262",
    textTransform: "capitalize",
  },
});
