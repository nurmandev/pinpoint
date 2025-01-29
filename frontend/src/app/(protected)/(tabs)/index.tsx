import { FlatList, SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";
import { Appbar, Menu } from "react-native-paper";
import FeedItem from "@/src/components/social/FeedItem";
import HeaderStories from "@/src/components/social/HeaderStories";
import { router } from "expo-router";
import { usePost } from "@/src/context/Post";

const Social = () => {
  const [visible, setVisible] = React.useState(false);
  const { posts } = usePost();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Image
          source={require("../../../../assets/images/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Appbar.Content title="" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="plus" onPress={openMenu} />}
          anchorPosition="bottom"
          mode="flat"
        >
          <Menu.Item
            leadingIcon="image-edit-outline"
            onPress={() => {
              closeMenu();
              router.push("/addpost");
            }}
            title="Add Post"
          />
          {/* <Menu.Item
            leadingIcon="book-open-page-variant"
            onPress={() => {}}
            title="Story"
          /> */}
          <Menu.Item
            leadingIcon="movie-open-play-outline"
            onPress={() => {
              closeMenu();
              router.push("/camera");
            }}
            title="Add Story"
          />
        </Menu>
        <Appbar.Action icon="magnify" onPress={() => router.push("/search")} />
        <Appbar.Action
          icon="bell-outline"
          onPress={() => router.push("/notification")}
        />
        <Appbar.Action
          icon="email-outline"
          onPress={() => router.push("/message")}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => <FeedItem item={item} />}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<HeaderStories />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Social;

const styles = StyleSheet.create({
  logo: { height: 40, width: 150 },
  story: {
    fontSize: 14,
    fontWeight: "medium",
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  storiesContainer: {
    height: 100,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
});
