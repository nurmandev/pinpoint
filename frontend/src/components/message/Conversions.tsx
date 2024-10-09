import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React from "react";
import { Appbar, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import useDimensions from "@/src/hooks/useDimension";

interface Props {
  handlePress: (id: string) => void;
}
const Conversions: React.FC<Props> = ({ handlePress }) => {
  const { colors } = useTheme();
  const { isMobile, height } = useDimensions();

  const rendereHeader = () => (
    <>
      <View style={styles.header}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{
            borderColor: colors.outlineVariant,
            borderRadius: 10,
          }}
        />
        <Text style={styles.subHeading}>Leads</Text>
        <FlatList
          data={["1", "2", "3", "4", "5"]}
          renderItem={() => (
            <View style={styles.leaditem}>
              <Image
                source={require("../../../assets/images/feeds/feed2.png")}
                style={styles.storyImage}
              />
              <Text style={styles.leadText}>James</Text>
            </View>
          )}
          keyExtractor={(Item) => Item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ padding: 15 }}>
        <Text style={styles.subHeading}>Conversations</Text>
      </View>
    </>
  );
  return (
    <View style={[styles.container, { height: height }]}>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        {router.canGoBack() && isMobile && (
          <Appbar.BackAction onPress={() => router.back()} />
        )}
        <Appbar.Content title="Messages" />
      </Appbar.Header>

      <FlatList
        data={["1", "2", "3", "4", "5"]}
        ListHeaderComponent={rendereHeader}
        renderItem={() => (
          <Pressable
            onPress={() => handlePress("1")}
            style={styles.conversation}
          >
            <Image
              source={require("../../../assets/images/feeds/feed2.png")}
              style={styles.storyImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.leadText, { color: colors.primary }]}>
                James
              </Text>
              <Text style={{}}>
                Lorem ipsum dolor sit amet, consectetur adipird elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim{" "}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(Item) => Item}
        contentContainerStyle={{ gap: 10 }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Conversions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#e1e1e1",
  },
  header: {
    padding: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  leaditem: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  leadText: { fontSize: 12, fontWeight: "500" },
  conversation: {
    flexDirection: "row",
    gap: 5,
    padding: 15,
  },
});
