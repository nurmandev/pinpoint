import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Appbar, Checkbox } from "react-native-paper";
import { useUser } from "@/src/context/User";
import { useToastNotification } from "@/src/context/ToastNotificationContext";

const notification_settings = () => {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);

  const handleUpdateNotification = async (position: string, value: boolean) => {
    try {
      setLoading(true);
      const [field, subField] = position.split(".");
      console.log(field, subField);
      const updatedNotification = {
        ...user?.notification,
        [field]: {
          ...(user?.notification?.[field] || {}),
          [subField]: value,
        },
      };
      console.log(updatedNotification);
      // Call the API with the updated notification object
      await updateUser({ notification: updatedNotification });
      addNotification({ message: "Notification updated" });
    } catch (error: any) {
      console.log(error);
      // addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };
  console.log(user?.notification?.comment);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Notification settings" />
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <Text style={{ fontSize: 16, marginBottom: 25 }}>
          Take control of your notifications.
        </Text>
        <View style={styles.section}>
          <Text style={styles.label}>Comments</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "comment.email",
                  !user?.notification?.comment?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.comment?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "comment.push",
                  !user?.notification?.comment?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.comment?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Likes</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "likes.email",
                  !user?.notification?.likes?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.likes?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "likes.push",
                  !user?.notification?.likes?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.likes?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Fried Request</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "friend.email",
                  !user?.notification?.friend?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.friend?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "friend.push",
                  !user?.notification?.friend?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.friend?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Earned Badges</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "badge.email",
                  !user?.notification?.badge?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.badge?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "badge.push",
                  !user?.notification?.badge?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.badge?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "tags.email",
                  !user?.notification?.tags?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.tags?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "tags.push",
                  !user?.notification?.tags?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.tags?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Lead Communication</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "lead.email",
                  !user?.notification?.lead?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.lead?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "lead.push",
                  !user?.notification?.lead?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.lead?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Messages</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "message.email",
                  !user?.notification?.message?.email
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.message?.email ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() =>
                handleUpdateNotification(
                  "message.push",
                  !user?.notification?.message?.push
                )
              }
            >
              <Checkbox.Android
                status={
                  user?.notification?.message?.push ? "checked" : "unchecked"
                }
                uncheckedColor="#e1e1e1"
              />
              <Text style={[styles.optionText]}>Push notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default notification_settings;

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
