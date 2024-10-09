// LeadsMobile.tsx
import Button from "@/src/components/Button";
import Rating from "@/src/components/Rating";
import Select from "@/src/components/Select";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Text,
  TextInput,
  Appbar,
  Menu,
  useTheme,
} from "react-native-paper";

const type = [
  { label: "Active Leads", value: "active" },
  { label: "Pending Leads", value: "pending" },
  { label: "Leads Pool", value: "pool" },
  { label: "Completed Leads", value: "completed" },
];

const LeadsMobile: React.FC = () => {
  const { colors } = useTheme();
  const [selected, setSelected] = useState("Products");
  const [selectedLeadType, setSelectedLeadType] = useState<string | number>(
    "active"
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  // Sample data for leads
  const leads = Array(5).fill({
    name: "Product Name",
    category: "Clothing",
    locationName: "Location Name",
    subCategory: "Shirts",
    price: "$1500.99",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 15, backgroundColor: "white", marginTop: 5 }}>
        <View style={styles.buttonGroup}>
          <Button
            variant="outlined"
            onPress={() => setSelected("Products")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor: selected === "Products" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  {
                    color: selected === "Products" ? colors.primary : "black",
                  },
                ]}
              >
                Products
              </Text>
            </View>
          </Button>
          <Button
            variant="outlined"
            onPress={() => setSelected("Reviewed")}
            containerStyle={[
              styles.itemButton,
              {
                borderColor: selected === "Reviewed" ? colors.primary : "black",
              },
            ]}
          >
            <View style={styles.itemButtonContent}>
              <Text
                style={[
                  styles.itemButtonText,
                  { color: selected === "Reviewed" ? colors.primary : "black" },
                ]}
              >
                Reviewed Product
              </Text>
            </View>
          </Button>
        </View>
        <View
          style={{ borderWidth: 1, borderColor: "#e1e1e1", marginVertical: 20 }}
        />
        {/* Search Input */}
        <TextInput
          mode="outlined"
          placeholder="Search"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />

        {/* Leads List */}
        <View style={[styles.scrollView, styles.listContainer]}>
          {leads.map((lead, index) =>
            selected === "Products" ? (
              <TouchableOpacity
                onPress={() => router.push("/products/id")}
                key={index}
                style={[styles.leadCard, styles.mobileCard]}
              >
                <View style={styles.cardContent}>
                  <Text
                    style={[
                      styles.username,
                      { backgroundColor: colors.elevation.level2 },
                    ]}
                  >
                    {lead.name}
                  </Text>
                  <View style={{ padding: 10, gap: 15 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Location (s): </Text>
                      <Text style={{ flex: 2 }}>{lead.locationName}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Category: </Text>
                      <Text style={{ flex: 2 }}>{lead.category}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Subcategory:</Text>
                      <Text style={{ flex: 2 }}>{lead.subCategory}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Variant:</Text>
                      <Text style={{ flex: 2 }}>Male, White</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderTopWidth: 1,
                        borderTopColor: "#e1e1e1",
                        paddingTop: 10,
                      }}
                    >
                      <Text style={{ flex: 1 }}>
                        <Text style={styles.title}>Price: </Text>
                        {lead.price}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          flex: 1,
                          borderLeftWidth: 1,
                          borderLeftColor: "#e1e1e1",
                          paddingHorizontal: 30,
                        }}
                      >
                        <Feather name="link" size={20} color="gray" />
                        <Feather name="edit" size={20} color="gray" />
                        <Ionicons name="trash-outline" size={20} color="red" />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View key={index} style={[styles.leadCard, styles.mobileCard]}>
                <View style={styles.cardContent}>
                  <Text
                    style={[
                      styles.username,
                      { backgroundColor: colors.elevation.level2 },
                    ]}
                  >
                    {lead.name}
                  </Text>
                  <View style={{ padding: 10, gap: 15 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Variants: </Text>
                      <Text style={{ flex: 2, paddingLeft: 20 }}>
                        Male, White
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Customer Name: </Text>
                      <Text style={{ flex: 2, paddingLeft: 20 }}>
                        Customer Name
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Purchase Date:</Text>
                      <Text style={{ flex: 2, paddingLeft: 20 }}>MM/DD/YY</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.title}>Description:</Text>
                      <Text style={{ flex: 2, paddingLeft: 20 }}>
                        Lorem iudgh jif ess hg...
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderTopWidth: 1,
                        borderTopColor: "#e1e1e1",
                        paddingTop: 10,
                      }}
                    >
                      <Text style={{ flex: 1 }}>
                        <Text style={styles.title}>Price: </Text>
                        {lead.price}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          flex: 1,
                          borderLeftWidth: 1,
                          borderLeftColor: "#e1e1e1",
                          paddingHorizontal: 30,
                        }}
                      >
                        <Rating rating={5} show={false} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f9f9f9",
  },
  menuButtonContent: {
    flexDirection: "row",
  },
  menuButtonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    // marginHorizontal: 16,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 15,
  },
  listContainer: {
    // paddingHorizontal: 16,
    paddingBottom: 20,
  },
  leadCard: {
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  mobileCard: {
    marginHorizontal: 0, // Remove side margins for mobile
  },
  cardContent: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
  },
  itemButton: {
    backgroundColor: "white",
    flex: 1,
  },
  itemButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemButtonText: {
    fontSize: 20,
  },
});

export default LeadsMobile;
