import { imageURL } from "@/src/services/api";
import { IStory, IStoryItem } from "@/src/types/story";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ActivityIndicator, Menu } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { useUser } from "@/src/context/User";
import { Comment as IComment } from "@/src/types/comment";
import {
  createComment,
  getPostComments,
  replyToComment,
} from "@/src/services/comment";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { likeStoryService, unlikeStoryService } from "@/src/services/story";
import MultiSelect from "../../select/MultiSelect";
import CommentModal from "../FeedItem/Comment";
import Share from "../FeedItem/Share";

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

type StoryProp = {
  onFinishStory: () => void;
  isActive: boolean;
  story: IStory;
};

const { width } = Dimensions.get("window");

const StoryComponent: React.FC<StoryProp> = ({
  onFinishStory,
  isActive,
  story,
}) => {
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pausedProgress = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentStory = story.stories[currentStoryIndex];
  const [isMuted, setIsMuted] = useState(false);
  const [wentBack, setWentBack] = useState(0);
  const videoRef = useRef<Video>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(
    currentStory.likes.includes(user!._id)
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  const renderStoryContent = (story: IStoryItem) => {
    const handleLoad = () => setIsContentLoaded(true);
    switch (story?.media?.type) {
      case "image":
        return (
          <Image
            source={{ uri: imageURL + story?.media?.url }}
            style={styles.backgroundImage}
            onLoad={handleLoad}
          />
        );
      case "video":
        return (
          <Video
            ref={videoRef} // Assign ref to control playback
            source={{ uri: imageURL + story?.media?.url }}
            resizeMode={ResizeMode.CONTAIN}
            style={styles.backgroundImage}
            isMuted={isMuted}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                setIsContentLoaded(true);
              }
            }}
          />
        );
      default:
        return null; // setting it to default if type is not recognised
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < story.stories.length - 1) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3,
        useNativeDriver: false,
      }).start(() => {
        pausedProgress.current = 0;
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
      });
    } else {
      setWentBack(0);
      onFinishStory();
      setCurrentStoryIndex(0);
    }
  };

  const runProgressAnimation = () => {
    if (!isContentLoaded) return;
    if (!isActive) return;
    progressAnim.setValue(pausedProgress.current); //set the value of the progress of the story
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: (1 - pausedProgress.current) * 6000, //for how long each story currently 6 seconds
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory(); //once finished goes to nextStory()
      }
    });
  };

  const getProgressBarWidth = (storyIndex: number, currentIndex: number) => {
    if (currentIndex > storyIndex) {
      return "100%";
    } // this is when the Story has been viewed
    if (currentIndex === storyIndex) {
      return progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"], // this is when the story is being viewed
      });
    }
    return "0%"; // this is when the Story has not been viewed yet
  };

  const goToPreviousStory = () => {
    if (isPaused) {
      setIsPaused(false);
    }
    pausedProgress.current = 0;
    progressAnim.setValue(0);
    if (currentStoryIndex === 0) {
      setWentBack(wentBack + 1);
      runProgressAnimation();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handlePressIn = () => {
    //for pause if user holds the screen
    setIsPaused(true);
  };

  const handlePressOut = () => {
    //for pause if user releases the holded screen
    setIsPaused(false);
  };

  const handleScreenTouch = (evt: GestureResponderEvent) => {
    //this function takes the width and decided where the click was pressed if left or right
    const touchX = evt.nativeEvent.locationX;
    if (touchX < width / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const pausePlay = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  const muteAndUnMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const fetchComments = async () => {
    try {
      if (!currentStory._id) return;
      setLoading(true);
      const res = await getPostComments(currentStory._id);
      setComments(res);
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentStory._id]);

  const handleSendComment = async (content: string) => {
    if (!content || !currentStory._id) return;
    try {
      const res = await createComment(currentStory._id, content);
      setComments([...comments, { ...res, replies: [] }]);
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
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
      addNotification({ message: error.message, error: true });
    }
  };

  const openMenu = () => {
    setVisible(true);
    setIsPaused(true);
  };

  const closeMenu = () => {
    setVisible(false);
    setIsPaused(false);
  };

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await likeStoryService(currentStory._id);
      } else {
        await unlikeStoryService(currentStory._id);
      }

      setIsLiked(!isLiked);
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    }
  };

  const controlVideoPlayback = () => {
    if (currentStory?.media?.type === "video" && videoRef.current) {
      if (isPaused) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  };

  useEffect(() => {
    controlVideoPlayback();
  }, [isPaused, currentStoryIndex]);

  useEffect(() => {
    setIsContentLoaded(false);
  }, [currentStoryIndex]);

  useEffect(() => {
    if (!isPaused && isContentLoaded) {
      runProgressAnimation();
    } else {
      progressAnim.stopAnimation((value) => {
        pausedProgress.current = value;
      });
    }
  }, [currentStoryIndex, isPaused, isContentLoaded, isActive]);

  useEffect(() => {
    // Reset content loaded state on story change
    setIsContentLoaded(false);
  }, [currentStoryIndex]);

  useEffect(() => {
    setIsLiked(currentStory.likes.includes(user!._id));
  }, [currentStoryIndex]);

  return (
    <View style={styles.safeArea}>
      <Pressable
        onPress={handleScreenTouch}
        onLongPress={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1,
          },
          styles.container,
        ]}
      >
        <View style={styles.container}>
          {!isContentLoaded && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loadingIndicator}
            />
          )}
          {currentStory?.media?.type && renderStoryContent(currentStory)}
          <SafeAreaView>
            <View style={styles.progressBarContainer}>
              {story.stories.map((story, index) => (
                <View key={index} style={styles.progressBarBackground}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: getProgressBarWidth(index, currentStoryIndex),
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </SafeAreaView>
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
                    (currentStory.location
                      ? currentStory.location?.images[0]
                      : story.user.avatarUrl),
                }}
                style={styles.userAvatar}
              />
              <View style={styles.userDetails}>
                <Text style={[styles.username]}>
                  {currentStory.location
                    ? currentStory.location?.locationName
                    : story.user.username}
                </Text>
                {currentStory.location ? (
                  <Text style={styles.location} numberOfLines={1}>
                    {currentStory.location?.address}
                  </Text>
                ) : null}
              </View>
            </View>
            {currentStory.location ? (
              <Text style={{ color: "white", marginTop: 15 }}>
                <Text style={{ color: "#07d64c", fontWeight: "bold" }}>
                  Open{" "}
                </Text>
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
                  <Entypo
                    name="dots-three-horizontal"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              }
              anchorPosition="bottom"
              mode="flat"
            >
              <MultiSelect
                button={
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      paddingHorizontal: 15,
                    }}
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
              icon={
                <Ionicons name="chatbubble-outline" size={30} color="white" />
              }
              comments={comments}
              handleSendComment={handleSendComment}
              handleSendReply={handleSendReply}
              onOpen={() => setIsPaused(true)}
              onClose={() => setIsPaused(false)}
            />
            <Share
              buttonStyle={[styles.iconButton, { marginRight: 0 }]}
              icon={
                <Ionicons name="paper-plane-outline" size={30} color="white" />
              }
              onOpen={() => setIsPaused(true)}
              onClose={() => setIsPaused(false)}
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
      </Pressable>
    </View>
  );
};

export default StoryComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "contain",
    borderRadius: 18,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  progressBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "center",
    height: 3,
    backgroundColor: "transparent",
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: "white",
  },
  topBar: {
    position: "absolute",
    left: 15,
    top: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  buttonContainer: {
    position: "absolute",
    right: 10,
    top: 25,
    alignItems: "center",
    flexDirection: "row",
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
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
});
