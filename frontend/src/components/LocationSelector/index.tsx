import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { ActivityIndicator, useTheme } from "react-native-paper";
import PlaceRow, { PlaceRowProps } from "./PlaceRow";
// import * as Location from "expo-location";

const LocationSelector = ({
  onLocationSelect,
  close,
  focus,
  placeholder,
}: {
  onLocationSelect: (location: any) => void;
  close: () => void;
  focus?: boolean;
  placeholder?: string;
}) => {
  const { colors } = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  // const [currentCoords, setCurrentCoords] = useState(null);
  const textInput1 = useRef<GooglePlacesAutocompleteRef>(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log(location);
  //     setCurrentCoords({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //   })();
  // }, []);

  useEffect(() => {
    if (focus) {
      textInput1?.current?.focus();
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      {/* {currentCoords ? ( */}
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder={placeholder || "Search Location"}
        listViewDisplayed="auto"
        debounce={400}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        ref={textInput1}
        styles={{
          textInput: [
            styles.input,
            {
              borderColor: isFocus ? colors.primary : "gray",
              color: "black",
            },
          ],
          container: styles.listViewContainer,
          listView: styles.listView,
          separator: styles.separator,
        }}
        textInputProps={{
          cursorColor: "black",
          placeholderTextColor: "grey",
          onFocus: () => setIsFocus(true),
          onBlur: () => setIsFocus(false),
        }}
        query={{
          key: "AIzaSyBAG6Xy390W6KIWFx3DFQAtIDVnW3gqCFQ",
          language: "en",
          // components: "country:ng",
        }}
        onPress={(data, details) => {
          onLocationSelect({
            description: data.description,
            coordinates: details?.geometry.location, // { lat, lng }
          });
          const addressComponents = details!.address_components;

          // Find city and state
          const city = addressComponents.find((component) =>
            component.types.includes("locality")
          )?.long_name;

          const state = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name;

          onLocationSelect({
            description: data.description,
            coordinates: details?.geometry.location,
            city,
            state,
          });
          close();
        }}
        suppressDefaultStyles
        renderRow={(data: PlaceRowProps) => <PlaceRow {...data} />}
        // currentLocation={true}
        // currentLocationLabel="Current location"
      />
      {/* ) : (
        <ActivityIndicator />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  textInput: {
    height: 50,
    borderRadius: 8,
  },
  listView: {
    backgroundColor: "white",
  },

  input: {
    height: 40,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    paddingRight: 50,
  },
  listViewContainer: {
    // position: "absolute",
    // top: 10,
    // left: 40,
    // right: 10,
  },
  separator: {
    backgroundColor: "#e1e1e1",
    height: 1,
    marginHorizontal: 10,
  },
});

export default LocationSelector;
