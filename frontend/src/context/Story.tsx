import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import {
  getAllStoriesGroupedByUser,
  createStory,
  StoryData,
  viewStoryService,
} from "../services/story";
import { IStory } from "../types/story";
import { useUser } from "./User";
import { Location } from "../types/location";
import { Media } from "../types/post";
import { Animated, Easing } from "react-native";

export interface SortedStory {
  _id: string;
  location?: Location;
  media?: Media;
  caption?: string;
  views: string[];
  likes: string[];
  createdAt: Date;
  username: string;
  avatarUrl: string;
}
// Define the shape of the context data
interface StoryContextType {
  stories: IStory[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
  isViewerVisible: boolean;
  scaleAnim: any;
  opacityAnim: any;
  startIndex: number;
  openViewer: (index: number) => void;
  closeViewer: () => void;
  fetchStories: () => Promise<void>;
  addStory: (storyData: StoryData) => Promise<void>;
  getSortedStoryMedia: (userId: string) => SortedStory[];
  viewStory: (id: string) => void;
}

// Create the Story Context
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// StoryProvider component
export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [stories, setStories] = useState<IStory[]>([]);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [startIndex, setStartIndex] = useState(0);

  const openViewer = (index: number) => {
    setStartIndex(index);
    setIsViewerVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  };

  const closeViewer = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start(() => setIsViewerVisible(false));
  };

  // Function to fetch all stories grouped by user
  const fetchStories = async () => {
    try {
      const data = await getAllStoriesGroupedByUser();
      const sortedStory = sortStoriesByRecentAndNotViewed(data);
      setStories(sortedStory);
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  };

  // Function to add a new story
  const addStory = async (storyData: StoryData) => {
    try {
      setUploading(true);
      await createStory(storyData);
      await fetchStories();
    } catch (err) {
      throw err;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const initialFetchStories = async () => {
      if (!user) return;
      try {
        setLoading(true);
        await fetchStories();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initialFetchStories();
  }, [user]);

  const sortStoriesByRecentAndNotViewed = (
    storiesArray: IStory[]
  ): IStory[] => {
    return storiesArray.sort((a, b) => {
      // Find the most recent story for each user
      const latestStoryA = a.stories.reduce((latest, current) =>
        new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current
      );
      const latestStoryB = b.stories.reduce((latest, current) =>
        new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current
      );

      // Check if the logged-in user has viewed the latest story
      const aViewed = latestStoryA.views.includes(user!._id);
      const bViewed = latestStoryB.views.includes(user!._id);
      // Priority 1: Unviewed stories should come first
      if (!aViewed && bViewed) return -1;
      if (aViewed && !bViewed) return 1;

      // Priority 2: Sort by the most recent story
      return (
        new Date(latestStoryB.createdAt).getTime() -
        new Date(latestStoryA.createdAt).getTime()
      );
    });
  };

  const getSortedStoryMedia = (userId: string): SortedStory[] => {
    const notViewedStories: SortedStory[] = [];
    const viewedStories: SortedStory[] = [];
    const userNotViewedStories: SortedStory[] = [];

    // Iterate once through all stories to build the required arrays
    stories.forEach((story) => {
      const { username, avatarUrl } = story.user;

      story.stories.forEach((individualStory) => {
        const isViewed = individualStory.views.includes(user!._id);
        const isUserStory = story._id === userId;

        // If it's the user's story and hasn't been viewed
        if (isUserStory && !isViewed) {
          userNotViewedStories.push({
            ...individualStory,
            username,
            avatarUrl,
          });
        } else if (isViewed) {
          viewedStories.push({
            ...individualStory,
            username,
            avatarUrl,
          });
        } else {
          notViewedStories.push({
            ...individualStory,
            username,
            avatarUrl,
          });
        }
      });
    });

    console.log(userNotViewedStories);
    return [...userNotViewedStories, ...notViewedStories, ...viewedStories];
  };

  const viewStory = async (id: string) => {
    await viewStoryService(id);
    // fetchStories();
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        loading,
        uploading,
        error,
        isViewerVisible,
        opacityAnim,
        scaleAnim,
        startIndex,
        closeViewer,
        openViewer,
        fetchStories,
        addStory,
        getSortedStoryMedia,
        viewStory,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

// Custom hook to use the Story Context
export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
