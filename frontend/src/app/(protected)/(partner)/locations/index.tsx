import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, TextInput, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useLocation } from "@/src/context/Location";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import { imageURL } from "@/src/services/api";

const Location = () => {
  const { colors } = useTheme();
  const { loadUserLocations, locations, deleteLocationById } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        await loadUserLocations();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          containerStyle={{ width: 150 }}
          onPress={() => router.push("/locations/setup")}
        >
          Add Location
        </Button>
        <Divider style={{ marginVertical: 20 }} />

        {/* Search Input */}
        <TextInput
          mode="outlined"
          placeholder="Search"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{
            borderColor: colors.outlineVariant,
            borderRadius: 10,
          }}
        />
        {loading && <LoadingOverlay />}
        {/* Table Rows */}
        {locations.length <= 0 && <Text>No Location Found</Text>}
        <ScrollView style={styles.body}>
          {locations.map((item) => (
            <View style={styles.card} key={item._id}>
              <View style={styles.head}>
                <View style={[styles.row, { flex: 1 }]}>
                  <Image
                    source={{ uri: imageURL + item.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerText} numberOfLines={1}>
                      {item.locationName}
                    </Text>
                    <Text numberOfLines={2}>{item.address}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Feather name="edit" size={24} color="gray" />
                  <Feather
                    name="trash-2"
                    size={24}
                    color="red"
                    onPress={() => deleteLocationById(item._id)}
                  />
                </View>
              </View>
              <Text>
                <Text style={{ fontWeight: "500" }}>Description:</Text>{" "}
                {item.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 5,
    padding: 15,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  body: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 50,
    borderRadius: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5,
  },
});
