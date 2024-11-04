import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedItem from "./social/FeedItem";
import { Post } from "../types/post";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  posts: Post[];
  loading: boolean;
}
const Activity: React.FC<Props> = ({ posts, loading }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 30 }} />
      ) : (
        posts.length <= 0 && (
          <View
            style={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No Activities</Text>
          </View>
        )
      )}
      {posts.map((item: Post) => (
        <FeedItem key={item._id} item={item} />
      ))}

      {/* <View
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
      </View> */}
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
