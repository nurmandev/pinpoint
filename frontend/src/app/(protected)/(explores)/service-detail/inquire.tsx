import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Checkbox, useTheme } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import TextInput from "@/src/components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { useService } from "@/src/context/Service";
import { IService } from "@/src/types/service";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import * as ImagePicker from "expo-image-picker";
import { createLead } from "@/src/services/lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUser } from "@/src/context/User";

const Inquire = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const [contactMethod, setContactMethod] = useState<"text" | "email" | "call">(
    "call"
  );
  const { getService } = useService();
  const { id } = useLocalSearchParams();
  const { addNotification } = useToastNotification();
  const [service, setService] = useState<IService | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [customerName, setCustomerName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceRequestDate, setServiceRequestDate] = useState("");
  const [details, setDetails] = useState("");
  const [media, setMedia] = useState<(File & { uri: string })[]>([]);
  const [creatingLead, setCreatingLead] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getService(id as string);
        setService(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchService();
  }, [id]);

  // Handle media upload
  const handleMediaUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        // Convert the selected image to a File type object
        const selectedImage = {
          uri: result.assets[0].uri,
          name: result.assets[0].uri.split("/").pop(),
          type: "image/jpeg", // Adjust based on media type
        } as any;
        setMedia([...media, selectedImage]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      !customerName ||
      !email ||
      !phone ||
      !contactMethod ||
      !address ||
      !serviceRequestDate ||
      !details
    ) {
      addNotification({ message: "Please fill in all fields", error: true });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      addNotification({
        message: "Please enter a valid email address",
        error: true,
      });
      return;
    }

    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(phone)) {
      addNotification({
        message: "Please enter a valid phone number",
        error: true,
      });
      return;
    }

    if (!["text", "email", "call"].includes(contactMethod)) {
      addNotification({
        message: "Please select a valid contact method",
        error: true,
      });
      return;
    }

    if (address.length < 5) {
      addNotification({
        message: "Please provide a valid address",
        error: true,
      });
      return;
    }

    const serviceDate = new Date(serviceRequestDate);
    const currentDate = new Date();
    if (isNaN(serviceDate.getTime()) || serviceDate < currentDate) {
      addNotification({
        message: "Please enter a valid future date for the service request",
        error: true,
      });
      return;
    }

    if (details.length < 20) {
      addNotification({
        message:
          "Please provide more details about the service (minimum 20 characters)",
        error: true,
      });
      return;
    }

    try {
      setCreatingLead(true);
      const leadData = {
        customerName,
        email,
        phone,
        contactMethod,
        address,
        serviceRequestDate: new Date(serviceRequestDate),
        details,
        location: service?.location[0]._id || "",
        item: service?._id || "",
        uploadedMedia: media,
      };

      const res = await createLead(leadData);
      router.replace({
        pathname: "/service-detail/success",
        params: { name: service?.location[0].locationName, id: res._id },
      });
    } catch (error: any) {
      console.error("Error creating lead:", error);
      addNotification({ message: error, error: true });
    } finally {
      setCreatingLead(false);
    }
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDate();
        setServiceRequestDate(currentDate.toDateString());
      }
    } else {
      toggleDate();
    }
  };
  const confirmDate = () => {
    setServiceRequestDate(date.toDateString());
    toggleDate();
  };
  const toggleDate = () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay />}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title={`${service?.name} - ${
            service?.priceType === "flat"
              ? `$${service.price}`
              : `$${service?.priceRange?.from} - $${service?.priceRange?.to} `
          }`}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          placeholder="Customer Name"
          value={customerName}
          onChangeText={setCustomerName}
          inputStyle={styles.textContainer}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputStyle={styles.textContainer}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          inputStyle={styles.textContainer}
        />
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>Prefer Method of Contact</Text>
          {["text", "email", "call"].map((item: any) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => setContactMethod(item)}
            >
              <Checkbox.Android
                status={contactMethod === item ? "checked" : "unchecked"}
              />
              <Text style={[styles.optionText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          inputStyle={styles.textContainer}
        />

        {show && (
          <>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display="spinner"
              is24Hour={true}
              onChange={onChange}
            />
            {Platform.OS === "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginBottom: 20,
                  gap: 20,
                }}
              >
                <Button
                  variant="outlined"
                  onPress={toggleDate}
                  containerStyle={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button onPress={confirmDate} containerStyle={{ flex: 1 }}>
                  Confirm
                </Button>
              </View>
            )}
          </>
        )}
        {!show && (
          <Pressable onPress={toggleDate}>
            <TextInput
              placeholder="Service Request Date"
              value={serviceRequestDate}
              inputStyle={styles.textContainer}
              editable={false}
              onPress={toggleDate}
            />
          </Pressable>
        )}
        <TextInput
          inputStyle={styles.textinput}
          placeholder="Please describe some more details about the service you are requesting"
          value={details}
          onChangeText={setDetails}
          multiline={true}
          numberOfLines={4}
        />
        <View style={{ flexDirection: "row", gap: 5, marginBottom: -10 }}>
          {media.map((me) => (
            <Image
              key={me.uri}
              source={{ uri: me.uri }}
              style={{ width: 40, height: 40 }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.uploadSection}
          onPress={handleMediaUpload}
        >
          <Ionicons name="cloud-upload-outline" size={30} />
          <Text style={{ fontSize: 18, marginVertical: 5 }}>
            Upload a Photo or Video
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Location Name</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {service?.location.map((loc) => (
            <View
              style={[
                styles.location,
                { backgroundColor: colors.elevation.level2 },
              ]}
              key={loc._id}
            >
              <Text style={{ fontSize: 12 }}>{loc.locationName}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button loading={creatingLead} onPress={handleSubmit}>
            Submit
          </Button>
          <Text
            style={{
              textAlign: "center",
              color: "#D67732",
              paddingVertical: 15,
              fontSize: 16,
            }}
          >
            No payments are made through our platform
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Inquire;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  textContainer: { backgroundColor: "white", borderRadius: 8 },
  text: { fontSize: 18, marginBottom: 5 },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#626262",
    textTransform: "capitalize",
  },
  uploadSection: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e1e1e1",
    marginVertical: 15,
  },
  textinput: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  location: {
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "flex-start",
    padding: 5,
    marginVertical: 5,
    borderColor: "#e1e1e1",
  },
  buttonContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
});
