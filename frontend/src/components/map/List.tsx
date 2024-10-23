import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Rating from "../Rating";
import { lightColors } from "@/src/utils/colors";
import { Location } from "@/src/types/location";
import { imageURL } from "@/src/services/api";

const List: React.FC<{ data: Location[] }> = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <RenderItem item={item} />}
        style={{ padding: 16 }}
      />
    </View>
  );
};

const RenderItem = ({ item }: { item: Location }) => {
  const [liked, setLiked] = useState(true);
  return (
    <View style={styles.userContainer}>
      <Image
        source={{ uri: imageURL + item.images[0] }}
        style={styles.profileImage}
      />
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.locationName}</Text>
        <Text style={styles.address} numberOfLines={2}>
          {item.address}
        </Text>

        <Text style={{ marginBottom: 3 }}>
          <Text style={{ color: "#07d64c", fontWeight: "bold" }}>Open</Text>{" "}
          till 5:00pm
        </Text>
        {/* <Text style={{}}>{item.info}</Text>//distance between two points */}
      </View>
      <View
        style={{
          //   alignItems: "flex-end",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <Rating rating={4.5} textStyle={{ color: "black" }} />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="navigate-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            style={styles.actionButton}
          >
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <SimpleLineIcons name="handbag" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 15,
    fontWeight: "200",
    marginVertical: 3,
  },
  button: {
    backgroundColor: lightColors.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followingText: {
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: 100,
    // flex: 1,
    // marginBottom: 10,
  },
  actionButton: {
    // marginRight: 15,
  },
});
