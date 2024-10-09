import { Stack } from "expo-router";
import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { lightColors } from "../utils/colors";
import { KeyboardAvoidingView, Platform, Text, TextInput } from "react-native";
import merge from "deepmerge";
import { AuthProvider } from "../context/Auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../context/User";
import { PostProvider } from "../context/Post";
import { LocationProvider } from "../context/Location";
import { StoryProvider } from "../context/Story";

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

const CombinedDefaultTheme = merge(LightTheme, {
  ...MD3LightTheme,
  colors: lightColors.colors,
});

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScalling?: boolean };
}
(Text as unknown as TextWithDefaultProps).defaultProps = {
  ...((Text as unknown as TextWithDefaultProps).defaultProps || {}),
  allowFontScalling: false,
};
(TextInput as unknown as TextWithDefaultProps).defaultProps = {
  ...((TextInput as unknown as TextWithDefaultProps).defaultProps || {}),
  allowFontScalling: false,
};

export default function Root() {
  return (
    <UserProvider>
      <AuthProvider>
        <PostProvider>
          <LocationProvider>
            <StoryProvider>
              <PaperProvider theme={CombinedDefaultTheme}>
                <ThemeProvider value={CombinedDefaultTheme}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                  >
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      <BottomSheetModalProvider>
                        <StatusBar style="dark" />
                        <Stack screenOptions={{ headerShown: false }}>
                          <Stack.Screen name="(protected)" />
                          <Stack.Screen name="(auth)" />
                          <Stack.Screen name="terms" />
                          <Stack.Screen name="privacy" />
                        </Stack>
                      </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                  </KeyboardAvoidingView>
                </ThemeProvider>
              </PaperProvider>
            </StoryProvider>
          </LocationProvider>
        </PostProvider>
      </AuthProvider>
    </UserProvider>
  );
}
