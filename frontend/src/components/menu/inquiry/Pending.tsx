import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Menu } from "react-native-paper";

const data = [1, 2, 3];

interface Props {}
const Pending: React.FC<Props> = () => {
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
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => router.push("/inquiry/detail")}
            style={styles.card}
            key={item}
          >
            <Image
              source={require("../../../../assets/images/product.png")}
              style={styles.image}
            />
            <View style={styles.rightSection}>
              <Text style={styles.name}>Service Name</Text>
              <Text style={{}}>Location Name</Text>
              <Text style={{}}>
                Lorem ipsum dolor sit amet, consectetur adipisci...
              </Text>
              <Text style={{}}>07/12/24, 09:00pm </Text>
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
  rightSection: { gap: 5 },
  name: { fontSize: 16, fontWeight: "500" },
  optionButton: { position: "absolute", top: 5, right: 15 },
});
