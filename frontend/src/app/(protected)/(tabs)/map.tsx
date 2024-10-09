import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import * as Location from "expo-location";
import { mapStyle } from "@/src/utils/map";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { generateRandomLocations } from "@/src/utils/data/map";
import BottomSheetComponent from "@/src/components/BottomSheetComponent";
import Filter from "@/src/components/map/Filter";
import List from "@/src/components/map/List";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import SelectedLocations from "@/src/components/map/SelectedLocations";
import { lightColors } from "@/src/utils/colors";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "@/src/components/mapview/Mapview";
import { CameraType, RegionType } from "@/src/types/map";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<LocationCoords[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.present();
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };
      setLocation(userLocation);
      setNearbyLocations(generateRandomLocations(userLocation, 7));
    })();
  }, []);

  useEffect(() => {
    if (location && selectedLocation && mapRef.current) {
      const edgePadding = { top: 200, right: 50, bottom: 500, left: 50 }; // Adjusted padding for bottom modal
      mapRef.current.fitToCoordinates([location, selectedLocation], {
        edgePadding: edgePadding,
        animated: true,
      });

      // Optional: Animate camera to center the view slightly upwards
      const midPoint = {
        latitude: (location.latitude + selectedLocation.latitude) / 2,
        longitude: (location.longitude + selectedLocation.longitude) / 2,
      };

      const camera: CameraType = {
        center: midPoint,
        pitch: 0,
        heading: 0,
        zoom: 20, // Adjust zoom as needed
        altitude: 1000, // Adjust altitude if necessary
      };

      mapRef.current.animateCamera(camera, { duration: 1000 }); // Smooth transition
    }
  }, [location, selectedLocation]);

  const mapRegion: RegionType | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    : undefined;

  const handleMarkerPress = (loc: LocationCoords) => {
    setSelectedLocation(loc);
    openSheet();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={mapStyle}
        userInterfaceStyle="light"
        showsUserLocation={false}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
      >
        {location && (
          <Marker coordinate={location}>
            <View style={styles.customMarker}>
              <View style={styles.markerInnerCircle} />
            </View>
          </Marker>
        )}

        {nearbyLocations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={loc}
            onPress={() => handleMarkerPress(loc)}
          >
            <Image
              source={require("@/assets/images/logo1.png")} // Replace with your custom image path
              style={styles.customImageMarker}
              resizeMode="contain"
            />
            <Text>Location name</Text>
          </Marker>
        ))}

        {selectedLocation && location && (
          <Polyline
            coordinates={[location, selectedLocation]}
            strokeColor={lightColors.colors.primary} // Blue color for the route
            strokeWidth={7}
          />
        )}
      </MapView>
      <View style={styles.header}>
        <BottomSheetComponent
          content={<Filter />}
          button={
            <Button
              disabled
              variant="outlined"
              containerStyle={styles.itemButton}
            >
              <View style={styles.itemButtonContent}>
                <AntDesign name="filter" size={24} />
                <Text style={styles.itemButtonText}>Filter</Text>
              </View>
            </Button>
          }
          actionButtonStyle={{ flex: 1 }}
          snapPoints={["60"]}
        />
        <BottomSheetComponent
          content={<List />}
          button={
            <Button
              disabled
              variant="outlined"
              containerStyle={styles.itemButton}
            >
              <View style={styles.itemButtonContent}>
                <Ionicons name="list" size={24} />
                <Text style={styles.itemButtonText}>List</Text>
              </View>
            </Button>
          }
          actionButtonStyle={{ flex: 1 }}
          snapPoints={["50"]}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["25%"]}
        enableOverDrag={false}
        index={0}
      >
        <BottomSheetView style={[styles.contentContainer]}>
          <SelectedLocations />
        </BottomSheetView>
      </BottomSheetModal>

      <View
        style={[
          styles.itemButton,
          {
            position: "absolute",
            bottom: 10,
            right: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 5,
            borderRadius: 5,
          },
        ]}
      >
        <Ionicons name="locate-sharp" size={24} />
        <Text>My Location</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    padding: 20,
    flexDirection: "row",
    gap: 20,
  },
  itemButton: {
    backgroundColor: "white",
    flex: 1,
    borderWidth: 0,
    shadowColor: "#787676",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  itemButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemButtonText: {
    fontSize: 20,
  },
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
    width: 30,
    height: 30,
  },
  contentContainer: {
    paddingBottom: 20,
    flex: 1,
  },
});
