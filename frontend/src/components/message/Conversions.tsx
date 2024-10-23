import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import useDimensions from "@/src/hooks/useDimension";
import { useMessage } from "@/src/context/Message";
import { imageURL } from "@/src/services/api";
import { IConversation } from "@/src/types/message";

interface Props {}
const Conversions: React.FC<Props> = () => {
  const { colors } = useTheme();
  const { isMobile, height } = useDimensions();
  const { setCurrentConversation, getConversations } = useMessage();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [leadConversation, setLeadConversation] = useState<IConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //add loading state
    getConversations("Chat").then((res) => {
      setConversations(res);
      setLoading(false);
    });

    getConversations("Lead").then((res) => {
      setLeadConversation(res);
    });
  }, []);

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
          data={leadConversation}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setCurrentConversation(item);
                router.push(`/inquiry/chat`);
              }}
              style={styles.leaditem}
            >
              <Image
                source={{ uri: imageURL + item?.otherUser?.image }}
                style={styles.storyImage}
              />
              <Text style={styles.leadText}>{item?.otherUser?.username}</Text>
            </Pressable>
          )}
          keyExtractor={(Item) => Item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ padding: 15 }}>
        <Text style={styles.subHeading}>Conversations</Text>
      </View>
      {conversations.length <= 0 && (
        <Text style={{ padding: 20 }}>No Conversation</Text>
      )}
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
        data={conversations}
        ListHeaderComponent={rendereHeader}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCurrentConversation(item)}
            style={styles.conversation}
          >
            <Image
              source={{ uri: imageURL + item?.otherUser?.image }}
              style={styles.storyImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.leadText, { color: colors.primary }]}>
                {item?.otherUser?.username}
              </Text>
              <Text style={{}}>{item.lastMessage.content}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(Item) => Item._id.toString()}
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
