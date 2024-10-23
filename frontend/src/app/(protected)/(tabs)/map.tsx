import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as Location from "expo-location";
import { mapStyle } from "@/src/utils/map";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import BottomSheetComponent from "@/src/components/BottomSheetComponent";
import Filter from "@/src/components/map/Filter";
import List from "@/src/components/map/List";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import SelectedLocations from "@/src/components/map/SelectedLocations";
import { lightColors } from "@/src/utils/colors";
import MapView, {
  MapViewDirections,
  Marker,
  PROVIDER_GOOGLE,
} from "@/src/components/mapview/Mapview";
import { CameraType, RegionType } from "@/src/types/map";
import { getNearbyLocations } from "@/src/services/location";
import { Location as ILocation } from "@/src/types/location";

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [nearbyLocations, setNearbyLocations] = useState<
    { location: LocationCoords; name: string; image: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    location: LocationCoords;
    name: string;
    image: string;
  } | null>(null);
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
    })();
  }, []);

  useEffect(() => {
    if (location && selectedLocation && mapRef.current) {
      const edgePadding = { top: 120, right: 50, bottom: 200, left: 50 }; // Adjusted padding for bottom modal
      mapRef.current.fitToCoordinates([location, selectedLocation.location], {
        edgePadding: edgePadding,
        animated: true,
      });
    }
  }, [location, selectedLocation]);

  useEffect(() => {
    const fetchNearByLocation = async () => {
      try {
        if (!location) return;
        const res = await getNearbyLocations({
          latitude: location?.latitude,
          longitude: location?.longitude,
          businessType: "both",
          category: "",
          radius: undefined,
        });
        const nearLocation = res
          .map(
            (loc: any) =>
              loc.coordinates.coordinates && {
                image: loc.images[0],
                name: loc.locationName,
                location: {
                  latitude: loc?.coordinates?.coordinates[1],
                  longitude: loc?.coordinates?.coordinates[0],
                },
              }
          )
          .filter((loc: any) => loc !== undefined);
        console.log(nearLocation);
        setNearbyLocations(nearLocation);
        setLocations(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchNearByLocation();
  }, [location]);

  const mapRegion: RegionType | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    : undefined;

  const handleMarkerPress = (loc: {
    location: LocationCoords;
    name: string;
    image: string;
  }) => {
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
            coordinate={loc.location}
            onPress={() => handleMarkerPress(loc)}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("@/assets/images/logo1.png")}
                style={styles.customImageMarker}
                resizeMode="contain"
              />
              <Text>{loc.name}</Text>
            </View>
          </Marker>
        ))}

        {selectedLocation && location && (
          <MapViewDirections
            origin={location}
            destination={selectedLocation.location}
            apikey={"AIzaSyBAG6Xy390W6KIWFx3DFQAtIDVnW3gqCFQ"}
            strokeWidth={4}
            strokeColor={lightColors.colors.primary}
          />
        )}
      </MapView>
      <View style={styles.header}>
        <BottomSheetComponent
          content={(close) => <Filter />}
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
          snapPoints={["50"]}
        />
        <BottomSheetComponent
          content={(close) => <List data={locations} />}
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
          <SelectedLocations
            origin={location!}
            destination={selectedLocation!}
          />
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
