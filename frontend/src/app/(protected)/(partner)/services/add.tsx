import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  Divider,
  TextInput,
  useTheme,
  Button as PaperButton,
  Checkbox,
} from "react-native-paper";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import HoursOfOperation from "@/src/components/partner/location/HoursOfOperation";
import Select from "@/src/components/Select";
import useDimensions from "@/src/hooks/useDimension";

const categoriesOption = [
  { label: "Clothing", value: "clothing" },
  { label: "Electronic", value: "electronic" },
];
const Location = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<(string | number)[]>([]);
  const { isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <>
          <Text style={styles.breadcrum}>
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Dashboard
            </Text>
            / Service
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}>Add Service</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button
                variant="outlined"
                containerStyle={{ width: 150, backgroundColor: "white" }}
              >
                Copy Service
              </Button>
              <Button containerStyle={{ width: 100 }}>Save</Button>
            </View>
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[styles.row, { flexDirection: isMobile ? "column" : "row" }]}
        >
          <View style={styles.leftCont}>
            {Platform.OS !== "web" && (
              <>
                <Button
                  variant="outlined"
                  containerStyle={{ width: 150, backgroundColor: "white" }}
                >
                  Copy Service
                </Button>
                <Divider style={{ marginVertical: 20 }} />
              </>
            )}
            <Text style={styles.photoLabel}>Basic Details</Text>
            <Divider style={{ marginVertical: 20 }} />
            <View style={{ flexDirection: "row", gap: 10, height: 200 }}>
              <View style={styles.imageButton}>
                <Ionicons name="add" size={28} color="gray" />
                <Text>Add Image</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                  <View style={styles.imageButton}>
                    <Ionicons name="add" size={28} color="gray" />
                  </View>
                  <View style={styles.imageButton}>
                    <Ionicons name="add" size={28} color="gray" />
                  </View>
                </View>
                <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                  <View style={styles.imageButton}>
                    <Ionicons name="add" size={28} color="gray" />
                  </View>
                  <View style={styles.imageButton}>
                    <Ionicons name="add" size={28} color="gray" />
                  </View>
                </View>
              </View>
            </View>
            <TextInput
              mode="outlined"
              label="Service Nane"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Description"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ marginBottom: 20 }}
              multiline
              numberOfLines={3}
              maxLength={100}
            />
            <Select
              placeholder="Estimate Duration"
              options={[]}
              onValueChange={() => {}}
              containerStyle={styles.select}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 40,
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text>Flat Price</Text>
                <Checkbox.Android status="unchecked" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text>Range Price</Text>
                <Checkbox.Android status="checked" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <View>
                <TextInput
                  mode="outlined"
                  label="From"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={[styles.input, { paddingLeft: 20 }]}
                />
                <FontAwesome style={styles.currency} name="dollar" size={20} />
              </View>
              <View>
                <TextInput
                  mode="outlined"
                  label="To"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={[styles.input, { paddingLeft: 20 }]}
                />
                <FontAwesome style={styles.currency} name="dollar" size={20} />
              </View>
            </View>
            <Select
              placeholder="Location Name"
              options={[]}
              onValueChange={() => {}}
              containerStyle={styles.select}
            />
            <Select
              placeholder="Menu Category"
              options={[]}
              onValueChange={() => {}}
              containerStyle={styles.select}
            />
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <PaperButton mode="text" icon={"plus"}>
                Add Additional Location
              </PaperButton>
            </View>
          </View>
          <View style={styles.rightCont}>
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <Text style={styles.photoLabel}>Service Details</Text>
              <Divider style={{ marginVertical: 20 }} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <Text style={{ flex: 1 }}>Service Category</Text>
                <MultiSelect
                  onValuesChange={(value) => setCategory(value)}
                  options={categoriesOption}
                  placeholder="Category"
                  containerStyle={{ flex: 2 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <Text style={{ flex: 1 }}>Subcategory</Text>
                <MultiSelect
                  onValuesChange={(value) => setCategory(value)}
                  options={categoriesOption}
                  placeholder="Subcategory"
                  containerStyle={{ flex: 2 }}
                />
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <Text style={{ flex: 1 }}>Option 1</Text>
                <MultiSelect
                  onValuesChange={(value) => setCategory(value)}
                  options={categoriesOption}
                  placeholder="Option Category"
                  containerStyle={{ flex: 1 }}
                  inputStyle={{ fontSize: 13 }}
                />
                <MultiSelect
                  onValuesChange={(value) => setCategory(value)}
                  options={categoriesOption}
                  placeholder="Option Name"
                  containerStyle={{ flex: 1 }}
                  inputStyle={{ fontSize: 13 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <PaperButton mode="text" icon={"plus"}>
                  Add Another Option
                </PaperButton>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text style={styles.photoLabel}>Discoverability</Text>
              <Divider style={{ marginVertical: 20 }} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Available Online</Text>
                <Checkbox.Android status="checked" />
              </View>

              <TextInput
                mode="outlined"
                label="Service Web Url"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Service Ships</Text>
                <Checkbox.Android status="checked" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>Pick-Up Available</Text>
                <Checkbox.Android status="checked" />
              </View>
              <Divider style={{ marginVertical: 20 }} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Text>In-Shop Only</Text>
                <Checkbox.Android status="checked" />
              </View>
            </View>
          </View>
        </View>
        {Platform.OS !== "web" && (
          <Button containerStyle={{ marginBottom: 15 }}>Save</Button>
        )}
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
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
  content: {},
  photoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCont: { flex: 1, backgroundColor: "white", padding: 15 },
  rightCont: { flex: 1 },
  imageButton: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 100,
    minWidth: 100,
    borderWidth: 3,
    borderColor: "white",
  },
  photoButton: {
    backgroundColor: "white",
    flex: 1,
  },

  input: {
    marginBottom: 20,
    height: 50,
  },
  addCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    right: 10,
    top: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  menu: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  select: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  currency: {
    position: "absolute",
    left: 10,
    top: 20,
  },
});
