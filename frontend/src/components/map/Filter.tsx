import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Button from "../Button";
import { useTheme } from "react-native-paper";
import SliderLabel from "../Filter/SliderLabel";
import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "../select/MultiSelect";
import { serviceOptions } from "@/src/utils/data/explore";

const WIDTH = Dimensions.get("screen").width;

const Filter: React.FC = () => {
  const { colors } = useTheme();
  const [distance, setDistance] = useState(14);
  const [selectedTypeValues, setSelectedTypeValues] = useState<
    (string | number)[]
  >([]);
  const [selectedDetailValues, setSelectedDetailValues] = useState<
    (string | number)[]
  >([]);

  const selectedTypeOptions = serviceOptions
    .filter((option) => selectedTypeValues.includes(option.value))
    .flatMap((option) => option.detailOptions);

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <ScrollView>
        {/* Location Distance */}
        <View
          style={{
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "500", marginBottom: 8 }}>
            Radius (miles)
          </Text>
          <MultiSlider
            values={[distance]}
            sliderLength={WIDTH - 30}
            onValuesChange={(values) =>
              setDistance(values as unknown as number)
            }
            enableLabel
            customLabel={(props) => (
              <SliderLabel
                oneMarkerValue={props.oneMarkerValue}
                twoMarkerValue={props.twoMarkerValue}
                oneMarkerLeftPosition={props.oneMarkerLeftPosition}
                twoMarkerLeftPosition={props.twoMarkerLeftPosition}
              />
            )}
            min={0}
            max={20}
            step={1}
            selectedStyle={{
              backgroundColor: colors.primary,
            }}
            unselectedStyle={{
              backgroundColor: "#e5e7eb",
            }}
            markerStyle={{
              backgroundColor: colors.primary,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}
            containerStyle={{ alignSelf: "center" }}
          />
        </View>
        <View style={styles.addressCont}>
          <Ionicons name="location-outline" size={18} />
          <Text>My Location</Text>
        </View>
        <MultiSelect
          placeholder="Business Type"
          selectedValues={selectedTypeValues}
          onValuesChange={(values) => setSelectedTypeValues(values)}
          options={[
            {
              label: "Products",
              value: "Products",
            },
            {
              label: "Services",
              value: "Services",
            },
          ]}
          containerStyle={styles.selectContainer}
        />

        <MultiSelect
          placeholder="Select Category"
          selectedValues={selectedTypeValues}
          onValuesChange={(values) => setSelectedTypeValues(values)}
          options={serviceOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          containerStyle={styles.selectContainer}
        />
        {/* <MultiSelect
          placeholder="Select details..."
          selectedValues={selectedDetailValues}
          onValuesChange={(values) => setSelectedDetailValues(values)}
          options={selectedTypeOptions}
          containerStyle={styles.selectContainer}
        /> */}
      </ScrollView>
      <Button>Show Result - 13 Locations</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  addressCont: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    padding: 10,
    paddingVertical: 15,
    marginVertical: 15,
  },
  selectContainer: {
    backgroundColor: "white",
    marginVertical: 15,
  },
});

export default Filter;
