import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Reply as IReply } from "@/src/types/comment";
import moment from "moment";

const Reply: React.FC<{ reply: IReply }> = ({ reply }) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={styles.replyContainer}>
      <Image source={{ uri: reply.userId.avatarUrl }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{reply.userId.username}</Text>
        <Text style={styles.content}>{reply.content}</Text>
        <View style={styles.footer}>
          <Text style={styles.time}>{moment(reply.createdAt).calendar()}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity> */}
        </View>

        {/* <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.replyText}>View 4 more replies </Text>
            <Ionicons name="chevron-down" size={13} />
          </View>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={() => setLiked(!liked)}
        style={styles.likeContainer}
      >
        <AntDesign
          name={liked ? "heart" : "hearto"}
          size={16}
          color={liked ? "red" : "black"}
          style={styles.heart}
        />
        <Text style={styles.likeCount}>{reply.likes}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginLeft: 50,
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
  },
  content: {
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginRight: 16,
  },
  replyText: {
    fontSize: 12,
    color: "#555",
  },
  likeContainer: {
    alignItems: "center",
    marginLeft: 8,
  },
  likeCount: {
    fontSize: 12,
    color: "#888",
  },
  heart: {
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
});

export default Reply;
