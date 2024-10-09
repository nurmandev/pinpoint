import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React from "react";
import { Card, Checkbox, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import useDimensions from "@/src/hooks/useDimension";

const partnership = () => {
  const { colors } = useTheme();
  const { isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <>
          <Text style={styles.breadcrum}>
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Dashboard
            </Text>{" "}
            / Partnership
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}> Partnership</Text>
          </View>
        </>
      )}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subheading}>Manage Your Subscription</Text>
        <View
          style={[styles.row, { flexDirection: isMobile ? "column" : "row" }]}
        >
          <Card style={styles.leftCol}>
            <View
              style={{
                backgroundColor: colors.primary,
                padding: 15,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <Text style={styles.text}>Current Subscription</Text>
                <Text style={styles.label}>$10.00/Wk</Text>
              </View>
              <Text style={styles.label}>Payment</Text>
              <Text style={styles.text}>Next Auto Payment is on MM/DD/YY</Text>
            </View>
            <View style={{ padding: 20 }}>
              <Text style={[styles.label, { color: "black" }]}>
                Experience More with Pinpoint
              </Text>
              <TouchableOpacity
                style={[styles.option]}
                // onPress={() => handleToggleValue(item.value)}
              >
                <Checkbox.Android
                  status={
                    "checked"
                    // localSelectedValues.includes(item.value)
                    //   ? "checked"
                    //   : "unchecked"
                  }
                />
                <Text style={[styles.optionText]}>Build a local community</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option]}
                // onPress={() => handleToggleValue(item.value)}
              >
                <Checkbox.Android
                  status={
                    "checked"
                    // localSelectedValues.includes(item.value)
                    //   ? "checked"
                    //   : "unchecked"
                  }
                />
                <Text style={[styles.optionText]}>Recieve Leads</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option]}
                // onPress={() => handleToggleValue(item.value)}
              >
                <Checkbox.Android
                  status={
                    "checked"
                    // localSelectedValues.includes(item.value)
                    //   ? "checked"
                    //   : "unchecked"
                  }
                />
                <Text style={[styles.optionText]}>
                  Easily Communicate & Collect Review
                </Text>
              </TouchableOpacity>
              <Button variant="outlined">Cancel Subscription</Button>
            </View>
          </Card>
          <View style={styles.rightCol}>
            <Card style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  opacity: 0.5,
                }}
              >
                <View>
                  <Text>Weekly</Text>
                  <Text style={[styles.label, { color: "black" }]}>
                    $10.00/Wk
                  </Text>
                </View>
                <Button containerStyle={{ width: 100 }} variant="contained">
                  Subscribed
                </Button>
              </View>
            </Card>
            <Card style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Monthly</Text>
                  <Text style={[styles.label, { color: "black" }]}>
                    $20.00/Wk
                  </Text>
                </View>
                <Button containerStyle={{ width: 100 }} variant="contained">
                  Subscribe
                </Button>
              </View>
            </Card>
            <Card style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Quartly</Text>
                  <Text style={[styles.label, { color: "black" }]}>
                    $100.00/Wk
                  </Text>
                </View>
                <Button containerStyle={{ width: 100 }} variant="contained">
                  Subscribe
                </Button>
              </View>
            </Card>
            <Card style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Yearly</Text>
                  <Text style={[styles.label, { color: "black" }]}>
                    $200.00/Wk
                  </Text>
                </View>
                <Button containerStyle={{ width: 100 }} variant="contained">
                  Subscribe
                </Button>
              </View>
            </Card>
          </View>
        </View>

        {Platform.OS !== "web" && (
          <Button containerStyle={{ marginVertical: 20 }}>Save</Button>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default partnership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 5,
    padding: Platform.OS === "web" ? 10 : 0,
  },
  breadcrum: { marginBottom: 30 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: Platform.OS === "web" ? 20 : 0,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: { flexDirection: "row", gap: 20 },
  leftCol: { flex: 1, backgroundColor: "white" },
  rightCol: { flex: 1, gap: 20 },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "white",
  },
  text: { color: "white" },
  option: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  card: { backgroundColor: "white", padding: 20 },
});
