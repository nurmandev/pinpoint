import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Menu, useTheme } from "react-native-paper";
import Rating from "../../Rating";
import { Lead } from "@/src/types/lead";
import { imageURL } from "@/src/services/api";
import moment from "moment";

interface Props {
  leads: Lead[];
}
const Completed: React.FC<Props> = ({ leads }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <View style={{ marginTop: 10 }}>
        {leads.length <= 0 && <Text>No Completed Lead</Text>}

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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.name}>{item.item.name}</Text>
                {item.reason === "Awaiting Customer Review" ? (
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/inquiry/review",
                        params: {
                          id: item?.item._id,
                          image: item?.item.images[0],
                          serviceName: item?.item.name,
                        },
                      })
                    }
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="comment-edit-outline"
                      color={colors.primary}
                    />
                    <Text style={{ color: colors.primary }}>
                      Leave a Review
                    </Text>
                  </Pressable>
                ) : (
                  <Text
                    style={{
                      color: item.reason === "Complete" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.reason}
                  </Text>
                )}
              </View>

              <Text style={{}}>{item.location.locationName}</Text>
              <Text style={{}} numberOfLines={2}>
                {item.item.description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{}}>
                  {moment(item.serviceRequestDate).calendar()}{" "}
                </Text>
                {item.reason === "Completed" && (
                  <Rating rating={item.rating} show={false} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Completed;

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
