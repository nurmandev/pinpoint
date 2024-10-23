import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatsData } from "./StatSection";
import Button from "../../Button";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

interface Props {
  statsData: StatsData[];
  onSave: (value: StatsData[]) => void;
  onClose: () => void;
}

const allData = [
  {
    title: "Active Leads",
    count: 100,
    icon: "people-outline",
    iconColor: "#009688",
    id: 1,
  },
  {
    title: "Check-Ins",
    count: 100,
    icon: "location-outline",
    iconColor: "#8BC34A",
    id: 2,
  },
  {
    title: "Followers",
    count: 100,
    icon: "person-add-outline",
    iconColor: "#673AB7",
    id: 3,
  },
  {
    title: "Unread Messages",
    count: 100,
    icon: "mail-outline",
    iconColor: "#FF5722",
    id: 4,
  },
  {
    title: "Likes",
    count: 100,
    icon: "heart-outline",
    iconColor: "#FFC107",
    id: 5,
  },
];
const AddData: React.FC<Props> = ({ statsData, onSave, onClose }) => {
  const [data, setData] = useState(statsData);
  const { colors } = useTheme();

  console.log(data);
  const handleOnpress = (value: StatsData) => {
    const newData = [...data];
    const isExist = newData.find((item) => item.id === value.id);
    if (isExist) {
      const index = newData.indexOf(isExist);
      newData.splice(index, 1);
    } else {
      newData.push(value);
    }
    setData(newData);
  };

  const save = () => {
    onSave(data);
    onClose();
  };

  const renderItem = ({ item }: { item: StatsData }) => {
    const isExist = data.find((stat) => stat.id === item.id);
    return (
      <TouchableOpacity
        onPress={() => handleOnpress(item)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          backgroundColor: colors.elevation.level1,
        }}
      >
        <Text style={{ fontWeight: "400", fontSize: 18 }}>{item.title}</Text>
        {isExist ? (
          <Ionicons name="remove" size={20} />
        ) : (
          <Ionicons name="add" size={20} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 15 }}>
        AddData
      </Text>
      <FlatList
        data={allData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button onPress={save}>Save</Button>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({});
