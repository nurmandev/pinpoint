import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Reply from "./Reply";
import { Comment as IComment } from "@/src/types/comment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { imageURL } from "@/src/services/api";

const Comment: React.FC<{
  comment: IComment;
  isReplying: (value: IComment) => void;
}> = ({ comment, isReplying }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: imageURL + comment.userId.avatarUrl }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{comment.userId.username}</Text>
        <Text style={styles.content}>{comment.content}</Text>
        <View style={styles.footer}>
          <Text style={styles.time}>
            {moment(comment.createdAt).calendar()}
          </Text>
          <Text onPress={() => isReplying(comment)} style={styles.time}>
            Reply
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
          {!showReplies && comment.replies.length > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.replyText}>
                View {comment.replies.length} replies{" "}
              </Text>
              <Ionicons name="chevron-down" size={13} />
            </View>
          )}
        </TouchableOpacity>
        {showReplies && (
          <FlatList
            data={comment.replies}
            renderItem={({ item }) => <Reply reply={item} />}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 8 }}
          />
        )}
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
        <Text style={styles.likeCount}>{comment.likes}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 50,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
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
    marginBottom: 5,
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
    marginBottom: 5,
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
