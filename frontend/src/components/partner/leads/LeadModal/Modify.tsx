import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";

interface Props {
  close: () => void;
  id: string;
  setLead: (data: Lead) => void;
}

const Modify: React.FC<Props> = ({ close, id, setLead }) => {
  const { addNotification } = useToastNotification();
  const { updateStatus } = useLead();

  const [approving, setApproving] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    time: "",
    date: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const modifyLead = async () => {
    try {
      setApproving;
      const res = await updateStatus(id, {
        status: "Modify",
      });
      addNotification({ message: "Lead Modified" });
      close();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Modify Lead</Text>
      <Text style={{ marginBottom: 10 }}>Adjust Leads detail</Text>

      <View>
        <TextInput
          mode="outlined"
          label="Enter Amount"
          keyboardType="numeric"
          value={`${formData.price}`}
          onChangeText={(text) => handleInputChange("price", text)}
          style={[styles.input, { paddingLeft: 20 }]}
        />
        <FontAwesome style={styles.currency} name="dollar" size={16} />
      </View>

      <Pressable>
        <TextInput
          mode="outlined"
          placeholder="Change Date"
          value={formData.date}
          style={[styles.textContainer]}
          editable={false}
        />
        <Ionicons name="calendar-outline" style={styles.calendar} size={18} />
      </Pressable>

      <Pressable onPress={() => {}}>
        <TextInput
          mode="outlined"
          placeholder="Change Time"
          value={formData.time}
          style={styles.textContainer}
          editable={false}
        />
        <Ionicons name="time-outline" style={styles.calendar} size={18} />
      </Pressable>

      <Button onPress={modifyLead} loading={approving}>
        Save
      </Button>
    </View>
  );
};

export default Modify;

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
  input: {
    marginBottom: 20,
    height: 40,
  },
  currency: {
    position: "absolute",
    left: 10,
    top: 19,
  },
  textContainer: { height: 40, marginBottom: 20 },
  calendar: { position: "absolute", right: 4, top: 10 },
});
