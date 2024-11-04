import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import DateTimePicker from "@react-native-community/datetimepicker";
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

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const modifyLead = async () => {
    if (!formData.date) {
      addNotification({ message: "Date is required", error: true });
      return;
    }
    if (!formData.time) {
      addNotification({ message: "Time is required", error: true });
      return;
    }
    if (!formData.price) {
      addNotification({ message: "Price is required", error: true });
      return;
    }
    try {
      setApproving(true);
      const res = await updateStatus(id, {
        status: "Modify",
        time: formData.time,
        date: formData.date,
        price: formData.price,
      });
      addNotification({ message: "Lead Modified" });
      close();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDate();
        const formattedDate = showTimePicker
          ? currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : currentDate.toDateString();
        handleInputChange(showTimePicker ? "time" : "date", formattedDate);
        // Combine date and time into a single datetime
        if (formData.date && formData.time) {
          const combinedDateTime = new Date(
            `${formData.date} ${formData.time}`
          ).toISOString();
          handleInputChange("datetime", combinedDateTime);
        }
      }
    } else {
      toggleDate();
    }
  };

  const confirmDate = () => {
    const formattedDate = showTimePicker
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toDateString();
    handleInputChange(showTimePicker ? "time" : "date", formattedDate);
    toggleDate();
  };

  const toggleDate = () => setShow(!show);

  return (
    <View>
      <Text style={styles.title}>Modify Lead</Text>
      <Text style={{ marginBottom: 10 }}>Adjust Lead Details</Text>

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

      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={showTimePicker ? "time" : "date"}
            display="spinner"
            is24Hour={true}
            onChange={onChange}
          />
          {Platform.OS === "ios" && (
            <View style={styles.iosButtonContainer}>
              <Button
                variant="outlined"
                onPress={toggleDate}
                containerStyle={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button onPress={confirmDate} containerStyle={{ flex: 1 }}>
                Confirm
              </Button>
            </View>
          )}
        </>
      )}
      {!show && (
        <>
          <Pressable
            onPress={() => {
              setShowTimePicker(false);
              toggleDate();
            }}
          >
            <TextInput
              mode="outlined"
              placeholder="Change Date"
              value={formData.date}
              style={styles.textContainer}
              editable={false}
              onPress={() => {
                setShowTimePicker(false);
                toggleDate();
              }}
            />
            <Ionicons
              name="calendar-outline"
              style={styles.calendar}
              size={18}
            />
          </Pressable>

          <Pressable
            onPress={() => {
              setShowTimePicker(true);
              toggleDate();
            }}
          >
            <TextInput
              mode="outlined"
              placeholder="Change Time"
              value={formData.time}
              style={styles.textContainer}
              editable={false}
              onPress={() => {
                setShowTimePicker(true);
                toggleDate();
              }}
            />
            <Ionicons name="time-outline" style={styles.calendar} size={18} />
          </Pressable>
        </>
      )}

      <Button onPress={modifyLead} loading={approving}>
        Save
      </Button>
    </View>
  );
};

export default Modify;

const styles = StyleSheet.create({
  title: { fontSize: 24, marginBottom: 5, fontWeight: "500" },
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
  iosButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 20,
  },
});
