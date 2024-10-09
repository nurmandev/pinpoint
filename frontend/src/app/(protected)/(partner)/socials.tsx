import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  Image,
} from "react-native";
import React from "react";
import FeedItem from "@/src/components/social/FeedItem";
import HeaderStories from "@/src/components/social/HeaderStories";
import NearBy from "@/src/components/partner/socials/NearBy";
import { useTheme } from "react-native-paper";
import useDimensions from "@/src/hooks/useDimension";
import { usePost } from "@/src/context/Post";

const Socials = () => {
  const { posts } = usePost();
  const { colors } = useTheme();
  const { height, isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      {!isMobile && (
        <View style={styles.row}>
          <Image
            source={require("../../../../assets/images/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={[styles.row, { height: height }]}>
        <FlatList
          data={posts}
          renderItem={({ item }) => <FeedItem item={item} />}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<HeaderStories />}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          style={{ flex: 3 }}
        />
        {!isMobile && (
          <ScrollView
            style={{ flex: 2, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.subHeading}>Nearby Users</Text>
              <Text style={[{ color: colors.primary, fontWeight: "500" }]}>
                See More
              </Text>
            </View>
            {posts.map((item) => (
              <NearBy key={item._id} item={item} />
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <Text style={styles.subHeading}>Nearby Partners</Text>
              <Text style={[{ color: colors.primary, fontWeight: "500" }]}>
                See More
              </Text>
            </View>
            {posts.map((item) => (
              <NearBy key={item._id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Socials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "web" ? 10 : 0,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  subHeading: { fontWeight: "500", fontSize: 18, marginBottom: 20 },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
    flex: 3,
    paddingHorizontal: 20,
  },
});
