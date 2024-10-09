import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { List } from "react-native-paper";
import Rating from "../../Rating";

type Item = {
  id: string;
  name: string;
  price: string;
  image: any;
};

const products: Item[] = [
  {
    id: "1",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "2",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "3",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "4",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
];

const services: Item[] = [
  {
    id: "1",
    name: "Service Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "2",
    name: "Service Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "3",
    name: "Service Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "4",
    name: "Service Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
];

const reviews = [
  {
    id: 1,
    title: "Product title",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    images: [],
    user: "Daniel Wilson",
    date: "07-07-24",
  },
  {
    id: 2,
    title: "Product title",
    rating: 5,
    comment: "",
    images: [],
    user: "Daniel Wilson",
    date: "07-07-24",
  },
  {
    id: 3,
    title: "Product title",
    rating: 5,
    comment: "",
    images: [
      require("../../../../assets/images/product.png"),
      require("../../../../assets/images/product.png"),
      require("../../../../assets/images/product.png"),
    ],
    user: "Daniel Wilson",
    date: "07-07-24",
  },
  {
    id: 4,
    title: "Product title",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    images: [
      require("../../../../assets/images/product.png"),
      require("../../../../assets/images/product.png"),
      require("../../../../assets/images/product.png"),
    ],
    user: "Daniel Wilson",
    date: "07-07-24",
  },
];

// Product or Service Card Component
const Card: React.FC<{ item: Item }> = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>{item.price}</Text>
  </View>
);

// Location Screen Component
const Info: React.FC = () => {
  const renderItem = ({ item }: { item: Item }) => <Card item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Description</Text>
        <Text style={styles.sectionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Retail</Text>
        <Text style={styles.sectionText}>
          Appliances, Bed & Bath, Books, Clothing & Apparel - Kids
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Services</Text>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Image
        source={require("../../../../assets/images/map.png")}
        style={styles.mapImage}
        resizeMode="cover"
      />
      <View style={[styles.section, { paddingVertical: 10 }]}>
        <List.Item
          title="15mins Drive from your location"
          description="Yori house, Rivers Street"
          left={(props) => <Ionicons name="location-outline" size={20} />}
          right={(props) => <Ionicons size={30} name="map-outline" />}
          titleStyle={{ fontWeight: "600", marginBottom: 5 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opening hours</Text>
        <Text style={styles.sectionText}>Monday - Friday 8AM - 5PM</Text>
        <Text style={styles.sectionText}>Saturday - Sunday Closed</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviewa (4.9/5)</Text>
        {reviews.map((review) => (
          <View
            key={review.id}
            style={{
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#e8e8e8",
            }}
          >
            <Rating rating={5} show={false} />
            <Text
              style={[
                styles.sectionText,
                { fontWeight: "500", marginVertical: 3 },
              ]}
            >
              {review.title}
            </Text>
            {review.comment && (
              <Text style={[styles.sectionText, { marginBottom: 8 }]}>
                {review.comment}
              </Text>
            )}
            <View style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}>
              {review.images.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  style={{ width: 50, height: 50, borderRadius: 8 }}
                  resizeMode="cover"
                />
              ))}
            </View>
            <Text style={[styles.sectionText, { fontWeight: "500" }]}>
              {review.user}
            </Text>
            <Text style={styles.sectionText}>{review.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  section: {
    // marginBottom: 16,
    paddingVertical: 24,
    padding: 16,
    borderBlockColor: "#1e1e1e",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
  card: {
    borderRadius: 20,
    marginRight: 16,
    width: 160,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mapImage: { height: 300, width: "100%" },
});

export default Info;
