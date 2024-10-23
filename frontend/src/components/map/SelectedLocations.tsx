import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { lightColors } from "@/src/utils/colors";
import { getDistanceAndTime } from "../../utils/map";
import { LocationCoords } from "@/src/app/(protected)/(tabs)/map";
import { imageURL } from "@/src/services/api";

interface Props {
  origin: LocationCoords;
  destination: { location: LocationCoords; name: string; image: string };
}

const SelectedLocations: React.FC<Props> = ({ origin, destination }) => {
  const { colors } = useTheme();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const { distance, duration } = await getDistanceAndTime(
          origin,
          destination.location
        );
        setDistance(distance);
        setDuration(duration);
      } catch (error) {
        console.error("Error fetching distance and duration:", error);
      }
    };

    fetchDistance();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 30, color: colors.primary, fontWeight: "500" }}>
        {duration} <Text style={{ color: "black" }}>({distance})</Text>
      </Text>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ alignItems: "center", gap: 5 }}>
          <View style={styles.customMarker}>
            <View style={styles.markerInnerCircle} />
          </View>
          <View
            style={{
              height: 30,
              //   width: 5,
              borderLeftWidth: 2,
            }}
          />
          <Image
            source={{ uri: imageURL + destination.image }}
            style={styles.customImageMarker}
            resizeMode="contain"
          />
        </View>
        <View style={{ gap: 15, flex: 1 }}>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderColor: "#e1e1e1",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>Your current location</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderColor: "#e1e1e1",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>{destination.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectedLocations;

const styles = StyleSheet.create({
  customMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 122, 255, 0.3)", // Light blue circle (outer)
    alignItems: "center",
    justifyContent: "center",
  },
  markerInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: lightColors.colors.primary, // Darker blue inner circle
  },
  customImageMarker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
