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
import { ProductProvider } from "../context/Product";
import { ServiceProvider } from "../context/Service";
import ToastNotification from "../components/ToastNotification";
import { ToastNotificationProvider } from "../context/ToastNotificationContext";
import MessageProvider from "../context/Message";
import "react-native-get-random-values";
import { LeadProvider } from "../context/Lead";
// import Geolocation from "@react-native-community/geolocation";
// import Geolocation from "react-native-geolocation-service";
// Geolocation.get=CurrentPosition((info) => console.log(info));

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
      <ToastNotificationProvider>
        <AuthProvider>
          <PostProvider>
            <LocationProvider>
              <StoryProvider>
                <ProductProvider>
                  <ServiceProvider>
                    <PaperProvider theme={CombinedDefaultTheme}>
                      <ThemeProvider value={CombinedDefaultTheme}>
                        <MessageProvider>
                          <LeadProvider>
                            <KeyboardAvoidingView
                              behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                              }
                              style={{ flex: 1 }}
                            >
                              <GestureHandlerRootView style={{ flex: 1 }}>
                                <BottomSheetModalProvider>
                                  <StatusBar style="dark" />
                                  <ToastNotification />
                                  <Stack screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="(protected)" />
                                    <Stack.Screen name="(auth)" />
                                    <Stack.Screen name="terms" />
                                    <Stack.Screen name="privacy" />
                                    <Stack.Screen name="+not-found" />
                                  </Stack>
                                </BottomSheetModalProvider>
                              </GestureHandlerRootView>
                            </KeyboardAvoidingView>
                          </LeadProvider>
                        </MessageProvider>
                      </ThemeProvider>
                    </PaperProvider>
                  </ServiceProvider>
                </ProductProvider>
              </StoryProvider>
            </LocationProvider>
          </PostProvider>
        </AuthProvider>
      </ToastNotificationProvider>
    </UserProvider>
  );
}
