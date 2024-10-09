import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../Button";
import { Checkbox, useTheme } from "react-native-paper";
import SliderLabel from "./SliderLabel";

const WIDTH = Dimensions.get("screen").width;

const Filter: React.FC = () => {
  const { colors } = useTheme();
  const [distance, setDistance] = useState(14);
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [isOnlineShopping, setIsOnlineShopping] = useState(true);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(["Male"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["White"]);
  const [showGender, setShowGender] = useState(true);
  const [showColor, setShowColor] = useState(true);

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setDistance(14);
    setPriceRange([10, 50]);
    setIsOnlineShopping(true);
    setSelectedGenders(["Male"]);
    setSelectedColors(["White"]);
  };

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: "#e1e1e1",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Filter</Text>
        <TouchableOpacity onPress={clearAllFilters}>
          <Text
            style={{ color: colors.primary, fontWeight: "500", fontSize: 18 }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Location Distance */}
        <View
          style={{
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "500", marginBottom: 8 }}>
            Location Distance (miles)
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

        {/* Price Range with MultiSlider */}
        <View
          style={{
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "500", marginBottom: 8 }}>
            Price Range ($)
          </Text>
          <MultiSlider
            values={priceRange}
            sliderLength={WIDTH - 30}
            onValuesChange={(values) => setPriceRange(values as number[])}
            min={0}
            max={100}
            step={1}
            enableLabel
            customLabel={(props) => (
              <SliderLabel
                oneMarkerValue={props.oneMarkerValue}
                twoMarkerValue={props.twoMarkerValue}
                oneMarkerLeftPosition={props.oneMarkerLeftPosition}
                twoMarkerLeftPosition={props.twoMarkerLeftPosition}
              />
            )}
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "500", marginRight: 8 }}>
            In-Store Shopping
          </Text>
          <Checkbox.Android status="checked" />
        </View>

        {/* Online Shopping */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontWeight: "500", marginRight: 8 }}>
            Online Shopping
          </Text>
          <Checkbox.Android status="checked" />
        </View>

        {/* Gender */}
        <View
          style={{
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => setShowGender(!showGender)}
          >
            <Text style={{ fontWeight: "500" }}>
              Gender{" "}
              {selectedGenders.length > 0 && `(${selectedGenders.length})`}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </TouchableOpacity>
          {showGender && (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}
            >
              {["Male", "Female", "Gender Neutral"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={{
                    backgroundColor: selectedGenders.includes(gender)
                      ? "#e5e7eb"
                      : "white",
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: "#e1e1e1",
                    margin: 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => toggleGender(gender)}
                >
                  <Text
                    style={{
                      color: "black",
                    }}
                  >
                    {gender}
                  </Text>
                  {selectedGenders.includes(gender) && (
                    <Ionicons name="close" size={18} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Colour */}
        <View
          style={{
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => setShowColor(!showColor)}
          >
            <Text style={{ fontWeight: "500" }}>
              Colour
              {selectedColors.length > 0 && `(${selectedColors.length})`}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </TouchableOpacity>
          {showColor && (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}
            >
              {["White", "Black", "Red", "Green"].map((color) => (
                <TouchableOpacity
                  key={color}
                  style={{
                    backgroundColor: selectedColors.includes(color)
                      ? "#e5e7eb"
                      : "white",
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: "#e1e1e1",
                    margin: 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => toggleColor(color)}
                >
                  <Text
                    style={{
                      color: "black",
                    }}
                  >
                    {color}
                  </Text>
                  {selectedColors.includes(color) && (
                    <Ionicons name="close" size={18} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Button>Show Result(1500) Products</Button>
    </View>
  );
};

export default Filter;
