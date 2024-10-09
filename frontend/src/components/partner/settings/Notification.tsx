import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";

const Notification = () => {
  return (
    <ScrollView style={{ padding: 15, flex: 1 }}>
      <Text style={{ fontSize: 16, marginBottom: 25 }}>
        Take control of your notifications.
      </Text>
      <View style={styles.section}>
        <Text style={styles.label}>Comments</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Likes</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Fried Request</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Earned Badges</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Tags</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="unchecked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Lead Communication</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="checked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="checked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Messages</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="checked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <Checkbox.Android status="checked" uncheckedColor="#e1e1e1" />
            <Text style={[styles.optionText]}>Push notification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  section: { marginBottom: 15 },
  label: { fontWeight: "500", fontSize: 16 },
  row: { flexDirection: "row" },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "300",
  },
});
