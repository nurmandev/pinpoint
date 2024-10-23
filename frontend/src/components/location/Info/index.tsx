import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import Rating from "../../Rating";
import { Location } from "@/src/types/location";
import { IProduct } from "@/src/types/product";
import { IService } from "@/src/types/service";
import { imageURL } from "@/src/services/api";
import moment from "moment";

interface Props {
  location: Location | null;
  products: { loading: boolean; products: IProduct[] };
  services: { loading: boolean; services: IService[] };
}
// Location Screen Component
const Info: React.FC<Props> = ({ location, products, services }) => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: imageURL + item.images[0] }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>
        {item.priceType === "range"
          ? `$${item?.priceRange?.from} - $${item?.priceRange?.to}`
          : `$${item.price}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Description</Text>
        <Text style={styles.sectionText}>{location?.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Retail</Text>
        <Text style={styles.sectionText}>
          {location?.categories.join(", ")}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        {products.loading ? (
          <ActivityIndicator />
        ) : products.products.length <= 0 ? (
          <Text>No Products Available</Text>
        ) : (
          <FlatList
            data={products.products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Services</Text>
        {services.loading ? (
          <ActivityIndicator />
        ) : services.services.length <= 0 ? (
          <Text>No Products Available</Text>
        ) : (
          <FlatList
            data={services.services}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <Image
        source={require("../../../../assets/images/map.png")}
        style={styles.mapImage}
        resizeMode="cover"
      />

      <View style={[styles.section, { paddingVertical: 10 }]}>
        <List.Item
          title="15mins Drive from your location"
          description={location?.address}
          left={(props) => <Ionicons name="location-outline" size={20} />}
          right={(props) => <Ionicons size={30} name="map-outline" />}
          titleStyle={{ fontWeight: "600", marginBottom: 5 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opening hours</Text>
        {location?.hoursOfOperation.map((time) => (
          <Text key={time.day} style={styles.sectionText}>
            <View style={{ width: 100 }}>
              <Text style={{}}>{time.day} </Text>
            </View>
            <Text style={{}}>
              {time.isOpen ? `${time.openTime} - ${time.closeTime}` : "Closed"}
            </Text>
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Reviews ({location?.reviews.length})
        </Text>

        {location?.reviews && location.reviews.length <= 0 ? (
          <Text>No review</Text>
        ) : (
          location?.reviews.map((review) => (
            <View
              key={review._id}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#e8e8e8",
              }}
            >
              <Rating rating={review.rating} show={false} />
              {review?.content && (
                <Text style={[styles.sectionText, { marginBottom: 8 }]}>
                  {review?.content}
                </Text>
              )}
              {review.images && review.images.length > 0 && (
                <View style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}>
                  {review?.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageURL + image }}
                      style={{ width: 50, height: 50, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}
              <Text style={[styles.sectionText, { fontWeight: "500" }]}>
                {review.userId.username}
              </Text>
              <Text style={styles.sectionText}>
                {moment(review.createdAt).calendar()}
              </Text>
            </View>
          ))
        )}
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
