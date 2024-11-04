import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Menu } from "react-native-paper";
import { Lead } from "@/src/types/lead";
import moment from "moment";
import { imageURL } from "@/src/services/api";

interface Props {
  leads: Lead[];
}

const Pending: React.FC<Props> = ({ leads }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderOption = () => (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} style={styles.optionButton}>
          <Ionicons name="ellipsis-vertical" size={20} />
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <Menu.Item
        leadingIcon="image-edit-outline"
        onPress={() => {
          closeMenu();
          router.push("/addpost");
        }}
        title="Add Post"
      />
      <TouchableOpacity
        onPress={closeMenu}
        style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
      >
        <Ionicons name="flag-outline" size={20} />
        <Text>Report Partner</Text>
      </TouchableOpacity>
    </Menu>
  );

  return (
    <View style={styles.section}>
      <View style={{ marginTop: 10 }}>
        {leads.length <= 0 && <Text>No Pending Lead</Text>}
        {leads.map((item) => (
          <TouchableOpacity
            onPress={() => router.push(`/inquiry/${item._id}`)}
            style={styles.card}
            key={item._id}
          >
            <Image
              source={{ uri: imageURL + item.item.images[0] }}
              style={styles.image}
            />
            <View style={styles.rightSection}>
              <Text style={styles.name}>{item.item.name}</Text>
              <Text style={{}}>{item.location.locationName}</Text>
              <Text style={{}} numberOfLines={3}>
                {item.item.description}
              </Text>
              <Text style={{ fontWeight: "500" }}>
                {moment(item.serviceRequestDate).calendar()}
              </Text>
            </View>
            {renderOption()}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Pending;

const styles = StyleSheet.create({
  section: {},
  sectionName: { fontSize: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingBottom: 15,
    marginBottom: 15,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  rightSection: { gap: 5, flex: 1 },
  name: { fontSize: 16, fontWeight: "500" },
  optionButton: { position: "absolute", top: 5, right: 15 },
});
