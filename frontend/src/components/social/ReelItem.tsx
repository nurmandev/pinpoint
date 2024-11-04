import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Ionicons, Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Menu } from "react-native-paper";
import MultiSelect from "../select/MultiSelect";
import CommentModal from "./FeedItem/Comment";
import Share from "./FeedItem/Share";
import { Location } from "@/src/types/location";
import { Comment as IComment } from "@/src/types/comment";
import {
  createComment,
  getPostComments,
  replyToComment,
} from "@/src/services/comment";
import { SortedStory } from "@/src/context/Story";
import { imageURL } from "@/src/services/api";
import { likeStoryService, unlikeStoryService } from "@/src/services/story";
import { useUser } from "@/src/context/User";

export const reportOption = [
  { label: "Nodity or Sexual Activity", value: "Nodity or Sexual Activity" },
  { label: "Bullyor Harassment", value: "Bullyor Harassment" },
  { label: "Suicide or Self-Injury", value: "Suicide or Self-Injury" },
  {
    label: "Promote Violence, Hate or Exploitation",
    value: "Promote Violence, Hate or Exploitation",
  },
  {
    label: "Selling or Promoting Restricted Items",
    value: "Selling or Promoting Restricted Items",
  },
  {
    label: "Scam, Fraud or False Impersonation",
    value: "Scam, Fraud or False Impersonation",
  },
  { label: "Intellectual Property", value: "Intellectual Property" },
  { label: "Other (Add Description)", value: "Other" },
];

const { height, width } = Dimensions.get("screen");

interface VideoItemProps {
  item: SortedStory;
  index: number;
  videoRefs: React.RefObject<(Video | Image)[]>;
  isPlaying: boolean;
  showControls: boolean;
  togglePlayPause: (videoRef: Video | Image) => void;
}

const ReelItem: React.FC<VideoItemProps> = ({
  item,
  index,
  videoRefs,
  isPlaying,
  showControls,
  togglePlayPause,
}) => {
  const { user } = useUser();
  console.log(item);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(item.likes.includes(user!._id));
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [laoding, setLaoding] = useState(true);
  const [error, setError] = useState("");

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
    console.log(item);
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

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await likeStoryService(item._id);
      } else {
        await unlikeStoryService(item._id);
      }

      setIsLiked(!isLiked);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.videoContainer}>
      {item.mediaType === "video" ? (
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={() => togglePlayPause(videoRefs.current![index])}
          activeOpacity={1}
        >
          {loading && (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={styles.loadingIndicator}
            />
          )}
          <Video
            ref={(ref) => {
              videoRefs.current![index] = ref!;
            }}
            style={styles.video}
            source={{ uri: imageURL + item.media }}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={false}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />

          {showControls && !loading && (
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={70}
              color="white"
              style={styles.playPauseIcon}
            />
          )}
        </TouchableOpacity>
      ) : (
        <Image
          ref={(ref) => {
            videoRefs.current![index] = ref!;
          }}
          source={{ uri: imageURL + item.media }}
          style={styles.video}
        />
      )}

      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      />

      {/* User Info */}
      <View style={[styles.userInfo]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri:
                imageURL +
                (item.location ? item.location?.images[0] : item.avatarUrl),
            }}
            style={styles.userAvatar}
          />
          <View style={styles.userDetails}>
            <Text style={[styles.username]}>
              {item.location ? item.location?.locationName : item.username}
            </Text>
            {item.location ? (
              <Text style={styles.location} numberOfLines={1}>
                {item.location?.address}
              </Text>
            ) : null}
          </View>
        </View>
        {item.location ? (
          <Text style={{ color: "white", marginTop: 15 }}>
            <Text style={{ color: "#07d64c", fontWeight: "bold" }}>Open </Text>
            till 5:00pm
          </Text>
        ) : null}
      </View>

      {/* Action Icons */}
      <View style={styles.actionIcons}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
              <Entypo name="dots-three-horizontal" size={30} color="white" />
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
        <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={30}
            color={isLiked ? "red" : "white"}
          />
        </TouchableOpacity>
        <CommentModal
          buttonStyle={[styles.iconButton, { marginRight: 0 }]}
          icon={<Ionicons name="chatbubble-outline" size={30} color="white" />}
          comments={comments}
          handleSendComment={handleSendComment}
          handleSendReply={handleSendReply}
        />
        <Share
          buttonStyle={[styles.iconButton, { marginRight: 0 }]}
          icon={<Ionicons name="paper-plane-outline" size={30} color="white" />}
        />
        <TouchableOpacity
          onPress={() => setIsFollowing(!isFollowing)}
          style={styles.iconButton}
        >
          <Feather
            name={isFollowing ? "user-check" : "user-plus"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReelItem;

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playPauseButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseIcon: {
    position: "absolute",
  },
  userInfo: {
    position: "absolute",
    bottom: 50,
    left: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  userDetails: {},
  username: {
    fontWeight: "bold",
    color: "white",
  },
  location: {
    color: "white",
    opacity: 0.5,
    width: width * 0.5,
  },
  actionIcons: {
    position: "absolute",
    bottom: 50,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    marginBottom: 20,
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
});
