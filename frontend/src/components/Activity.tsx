import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedItem from "./social/FeedItem";
import Rating from "./Rating";

const data = [
  {
    id: "2",
    username: "Foodie",
    location: "The Burger Place",
    image: null,
    video: null,
    likes: 560,
    comments: 45,
    description:
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings. Whether you like your burger simple or loaded with extras, The Burger Place has got you covered. The vibe here is casual and fun, making it the perfect spot to hang out with friends. Don’t forget to try their crispy fries and creamy milkshakes. It's an experience you won't forget!",
  },
  {
    id: "1",
    username: "Traveler",
    location: "Paris, France",
    image: require("../../assets/images/feeds/feed1.png"),
    video: null,
    likes: 245,
    comments: 30,
    description:
      "Exploring the beautiful city of Paris has always been on my bucket list. The Eiffel Tower was absolutely breathtaking, especially at night when it's all lit up. The food, the people, and the architecture are simply stunning. There's something magical about wandering through the streets, discovering little cafés, and soaking in the rich history and culture. Every corner you turn, there's a new adventure waiting. Can't wait to come back!",
  },
  {
    id: "3",
    username: "NatureLover",
    location: "Yosemite National Park",
    image: require("../../assets/images/feeds/feed2.png"),
    video: null,
    likes: 876,
    comments: 120,
    // description:
    //   "Yosemite National Park is a slice of paradise on Earth. The towering waterfalls, the lush meadows, and the majestic cliffs take your breath away. I spent the day hiking and every trail led to a view more stunning than the last. There's something humbling about being surrounded by nature in all its glory. It’s the perfect place to disconnect from the world and reconnect with yourself. Highly recommend this to anyone who loves the great outdoors!",
  },
  {
    id: "4",
    username: "Photographer",
    location: "Santorini, Greece",
    image: null,
    video: require("../../assets/videos/feed2.mp4"),
    likes: 1024,
    comments: 85,
    // description:
    //   "Santorini is a photographer's dream come true. The iconic white-washed buildings with blue domes, set against the backdrop of the Aegean Sea, create a picture-perfect setting. The sunsets here are nothing short of spectacular, painting the sky in hues of orange, pink, and purple. Walking through the narrow streets, you can feel the history and culture that permeates every corner. Whether you're here for the views, the food, or the culture, Santorini never disappoints.",
  },
  {
    id: "5",
    username: "Foodie",
    location: "The Burger Place",
    image: null,
    video: require("../../assets/videos/feed3.mp4"),
    likes: 560,
    comments: 45,
    description:
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings. Whether you like your burger simple or loaded with extras, The Burger Place has got you covered. The vibe here is casual and fun, making it the perfect spot to hang out with friends. Don’t forget to try their crispy fries and creamy milkshakes. It's an experience you won't forget!",
  },
];

const review = {
  id: 4,
  title: "Product title",
  rating: 5,
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  images: [
    require("../../assets/images/product.png"),
    require("../../assets/images/product.png"),
    require("../../assets/images/product.png"),
  ],
  user: "Daniel Wilson",
  date: "07-07-24",
};

const Activity = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      {data.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}

      <View
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#e8e8e8",
        }}
      >
        <Rating rating={5} show={false} />
        <Text
          style={[styles.sectionText, { fontWeight: "500", marginVertical: 3 }]}
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
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
});
