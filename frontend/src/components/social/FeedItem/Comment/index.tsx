import React, { useRef, useState, ReactNode, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Comment from "./Comment";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useUser } from "@/src/context/User";
import { Comment as IComment } from "@/src/types/comment";

interface Props {
  handleSendComment: (value: string) => Promise<void>;
  handleSendReply: (value: string, commentId: string) => Promise<void>;
  comments: IComment[];
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}
const CommentModal: React.FC<Props> = ({
  buttonStyle,
  icon,
  comments,
  handleSendComment,
  handleSendReply,
}) => {
  const { user } = useUser();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState("");
  const [isReplying, setIsReplying] = useState<IComment | null>(null);

  const openSheet = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.present();
    }
  };

  const sendCommet = async () => {
    if (content.trim() !== "") {
      await handleSendComment(content);
      setContent("");
    }
  };

  const sendReply = async () => {
    if (content.trim() !== "") {
      await handleSendReply(content, isReplying!._id);
      setContent("");
      setIsReplying(null);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.actionButton, buttonStyle]}
        onPress={openSheet}
      >
        {icon ? (
          icon
        ) : (
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        )}
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        enableOverDrag={false}
        index={0}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.headerText}>{comments.length} Comments</Text>
          <BottomSheetFlatList
            data={comments}
            renderItem={({ item }) => (
              <Comment comment={item} isReplying={setIsReplying} />
            )}
            keyExtractor={(item) => item._id}
            style={{ paddingHorizontal: 16 }}
          />
          <View
            style={{
              paddingHorizontal: 16,
              borderTopWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 8,
            }}
          >
            {isReplying ? (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text>
                  Replying to{" "}
                  <Text style={{ fontWeight: "600" }}>
                    {isReplying.userId.username}
                  </Text>
                </Text>
                <Ionicons
                  name="close"
                  size={18}
                  onPress={() => setIsReplying(null)}
                />
              </View>
            ) : null}
            <View style={styles.inputContainer}>
              <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
              <View style={styles.inputCont}>
                <TextInput
                  style={styles.input}
                  placeholder="Add your comment..."
                  placeholderTextColor={"gray"}
                  value={content}
                  onChangeText={(text) => setContent(text)}
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={isReplying ? sendReply : sendCommet}
                >
                  <Ionicons name="send" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
    flex: 1,
  },
  actionButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  inputCont: {
    flex: 1,
    borderRadius: 20,
    height: "100%",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    height: "100%",
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
});

export default CommentModal;
