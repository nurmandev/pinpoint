import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Switch, TextInput, useTheme } from "react-native-paper";
import Select from "../../Select";
import { operatingHoursOptions } from "@/src/utils/data/location";

const daysOfWeek = [
  { day: "Sunday", isOpen: false },
  { day: "Monday", isOpen: true },
  { day: "Tuesday", isOpen: true },
  { day: "Wednesday", isOpen: true },
  { day: "Thursday", isOpen: true },
  { day: "Friday", isOpen: true },
  { day: "Saturday", isOpen: false },
];

interface Props {
  onChange: (
    value: {
      day: string;
      isOpen: boolean;
      openTime: string;
      closeTime: string;
    }[]
  ) => void;
}

const HoursOfOperation: React.FC<Props> = ({ onChange }) => {
  const [hours, setHours] = useState(
    daysOfWeek.map((day) => ({
      day: day.day,
      isOpen: day.isOpen,
      openTime: "10:00 AM",
      closeTime: "09:00 PM",
    }))
  );

  useEffect(() => {
    onChange(hours);
  }, [hours]);

  const handleToggle = (index: number) => {
    const newHours = [...hours];
    newHours[index].isOpen = !newHours[index].isOpen;
    setHours(newHours);
  };

  const handleTimeChange = (
    index: number,
    type: "open" | "close",
    value: string
  ) => {
    const newHours = [...hours];
    if (type === "open") {
      newHours[index].openTime = value;
    } else {
      newHours[index].closeTime = value;
    }
    setHours(newHours);
  };

  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {hours.map((day, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.dayRow}>
            <Text style={styles.dayText}>{day.day}</Text>
            <Switch
              value={day.isOpen}
              onValueChange={() => handleToggle(index)}
              color={colors.primary}
            />
          </View>

          {day.isOpen ? (
            <View style={styles.timeRow}>
              <Select
                selectedValue={day.openTime}
                onValueChange={(text) =>
                  handleTimeChange(index, "open", text as string)
                }
                placeholder="Select"
                options={operatingHoursOptions}
                containerStyle={styles.select}
                inputStyle={{ fontSize: 12 }}
              />

              <Text style={styles.toText}>to</Text>
              <Select
                selectedValue={day.closeTime}
                onValueChange={(text) =>
                  handleTimeChange(index, "close", text as string)
                }
                options={operatingHoursOptions}
                placeholder="Select"
                containerStyle={styles.select}
                inputStyle={{ fontSize: 12 }}
              />
            </View>
          ) : (
            <Text style={styles.closedText}>Closed</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 50,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    minWidth: 100,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  timeInput: {
    width: 100,
    marginRight: 10,
  },
  toText: {
    marginHorizontal: 5,
  },
  closedText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    flex: 1,
  },
  select: {
    height: 40,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 5,
  },
});

export default HoursOfOperation;
