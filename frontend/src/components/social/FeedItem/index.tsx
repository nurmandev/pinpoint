import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { Menu } from "react-native-paper";
import { router } from "expo-router";
import CommentModal from "./Comment";
import Share from "./Share";
import MultiSelect from "../../select/MultiSelect";
import { reportOption } from "../ReelItem";
import { Post } from "@/src/types/post";
import { LinearGradient } from "expo-linear-gradient";
import { usePost } from "@/src/context/Post";
import { useUser } from "@/src/context/User";
import {
  createComment,
  getPostComments,
  replyToComment,
} from "@/src/services/comment";
import { Comment as IComment } from "@/src/types/comment";
import { imageURL } from "@/src/services/api";
import useDimensions from "@/src/hooks/useDimension";
import { IStory } from "@/src/types/story";
import { useToastNotification } from "@/src/context/ToastNotificationContext";

interface Props {
  item: any;
}

const FeedItem: React.FC<Props> = ({ item }) => {
  const { likeExistingPost } = usePost();
  const { addNotification } = useToastNotification();
  const { user } = useUser();
  const { width } = useDimensions();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [laoding, setLaoding] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(
    user && item.likes.includes(user?._id)
  );

  const fetchComments = async () => {
    try {
      if (!item._id) return;
      setLaoding(true);
      const res = await getPostComments(item._id);
      setComments(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [item._id]);

  const handleSendComment = async (content: string) => {
    if (!content || !item._id) return;
    try {
      const res = await createComment(item._id, content);
      setComments([...comments, { ...res, replies: [] }]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSendReply = async (content: string, commentId: string) => {
    if (!content) return;
    try {
      const res = await replyToComment(commentId, content);
      setComments((prev) => {
        const index = prev.findIndex((comment) => comment._id === commentId);
        if (index !== -1) {
          prev[index].replies.push({ ...res, replies: [] });
          return prev;
        }
        return prev;
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handlePlayPause = useCallback(() => {
    if (status?.isPlaying) {
      video.current?.pauseAsync();
    } else {
      video.current?.playAsync();
    }
  }, [status]);

  const handleLike = async () => {
    try {
      if (!user) return;
      await likeExistingPost(item._id);
      setIsLiked(!isLiked);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  const renderOption = (item: Post) => (
    <View style={styles.userInfo}>
      <Image
        source={{
          uri:
            imageURL +
            (item.location ? item?.location?.images[0] : item.userId.avatarUrl),
        }}
        style={styles.userAvatar}
      />
      <Pressable
        onPress={() =>
          item.location
            ? router.push({
                pathname: "/location",
                params: { id: item.location._id },
              })
            : null
        }
        style={styles.userDetails}
      >
        <Text
          style={[
            styles.username,
            item.media && item.media?.length < 1 && { color: "black" },
          ]}
        >
          {item.location ? item?.location?.locationName : item.userId.username}
        </Text>
        {item.location ? (
          <Text
            numberOfLines={2}
            style={[styles.location, { width: width * 0.55 }]}
          >
            {item?.location?.address}
          </Text>
        ) : null}
      </Pressable>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons
              name="ellipsis-horizontal"
              size={25}
              color={item.media && item.media?.length < 1 ? "black" : "#e1e1e1"}
            />
          </TouchableOpacity>
        }
        anchorPosition="bottom"
        mode="flat"
      >
        <MultiSelect
          button={
            <View
              style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
            >
              <Ionicons name="flag-outline" size={20} />
              <Text>Report Partner</Text>
            </View>
          }
          options={reportOption}
          onValuesChange={() => {}}
          containerStyle={{ borderWidth: 0 }}
          buttonText="Report"
        />
      </Menu>
    </View>
  );

  return (
    <View style={styles.feedItem}>
      {(item?.media?.length &&
        item?.media?.length > 0 &&
        item?.media[0].type === "video") ||
      item?.media?.type === "video" ? (
        <>
          <Video
            ref={video}
            source={{ uri: imageURL + (item.media.url || item.media[0].url) }}
            style={styles.mediaBackground}
            isLooping
            // shouldPlay
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={[styles.mediaBackground, styles.videoCont, { height: 100 }]}
          />
          <View style={[styles.mediaBackground, styles.videoCont]}>
            <Ionicons
              name={status.isPlaying ? "pause-circle" : "play-circle"}
              onPress={handlePlayPause}
              size={40}
              color="white"
            />
            <Ionicons
              name={
                status.isMuted ? "volume-mute-outline" : "volume-high-outline"
              }
              style={{ position: "absolute", bottom: 15, right: 20 }}
              size={40}
              color="white"
            />
            <View
              style={{ position: "absolute", top: 15, left: 20, right: 20 }}
            >
              {renderOption(item)}
            </View>
          </View>
        </>
      ) : (item?.media?.length &&
          item?.media?.length > 0 &&
          item?.media[0].type === "image") ||
        item?.media?.type === "image" ? (
        <ImageBackground
          source={{ uri: imageURL + (item?.media?.url || item.media[0].url) }}
          resizeMode="cover"
          style={styles.mediaBackground}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={styles.background}
          />
          {renderOption(item)}
        </ImageBackground>
      ) : (
        renderOption(item)
      )}

      {/* Optional Description */}
      {item.content ? (
        <Text style={styles.description}>{item.content}</Text>
      ) : null}

      {/* Actions Section */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={24}
            color={isLiked ? "red" : "black"}
          />
        </TouchableOpacity>
        <CommentModal
          handleSendComment={handleSendComment}
          handleSendReply={handleSendReply}
          comments={comments}
        />
        <Share />
      </View>
      <Text style={styles.stats}>
        {item.likes.length} Likes · {comments.length} Comments
      </Text>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  videoCont: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 15,
    top: 15,
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    // zIndex: 10,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  location: {
    color: "#b5afaf",
  },
  description: {
    marginVertical: 10,
  },
  mediaBackground: {
    width: Platform.OS === "web" ? "100%" : "auto",
    height: 450,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginBottom: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  stats: {},
});
