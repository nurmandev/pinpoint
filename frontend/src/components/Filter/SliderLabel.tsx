import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface SliderLabelProps {
  oneMarkerValue: string | number;
  twoMarkerValue: string | number;
  oneMarkerLeftPosition: number;
  twoMarkerLeftPosition: number;
}

const SliderLabel: React.FC<SliderLabelProps> = ({
  oneMarkerValue,
  oneMarkerLeftPosition,
  twoMarkerValue,
  twoMarkerLeftPosition,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.labelContainer}>
      {oneMarkerLeftPosition ? (
        <>
          <View
            style={[
              styles.label,
              {
                left: oneMarkerLeftPosition - 13,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={styles.labelText}>{oneMarkerValue}</Text>
          </View>
          <View
            style={[
              styles.arrow,
              {
                backgroundColor: colors.primary,
                left: oneMarkerLeftPosition - 3,
              },
            ]}
          />
        </>
      ) : null}
      {twoMarkerLeftPosition ? (
        <>
          <View
            style={[
              styles.label,
              {
                left: twoMarkerLeftPosition - 13,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={styles.labelText}>{twoMarkerValue}</Text>
          </View>
          <View
            style={[
              styles.arrow,
              {
                backgroundColor: colors.primary,
                left: twoMarkerLeftPosition - 3,
              },
            ]}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: "absolute",
    top: -13,
    width: "100%",
    height: 30,
  },
  label: {
    position: "absolute",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  labelText: {
    color: "white",
    fontSize: 12,
    zIndex: 20,
  },
  arrow: {
    width: 8,
    height: 8,
    position: "absolute",
    bottom: 6,
    transform: [{ rotate: "45deg" }],
  },
});

export default SliderLabel;
