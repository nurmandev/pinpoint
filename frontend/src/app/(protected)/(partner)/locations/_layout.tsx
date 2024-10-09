import useDimensions from "@/src/hooks/useDimension";
import { Stack, router } from "expo-router";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";

export default function Layout() {
  const { isMobile } = useDimensions();
  return (
    <Stack
      screenOptions={{
        headerShown: !isMobile ? false : true,
        header: ({ options }) => (
          <Appbar.Header style={{ backgroundColor: "#fff" }}>
            {router.canGoBack() && isMobile && (
              <Appbar.BackAction onPress={() => router.back()} />
            )}
            <Appbar.Content title={options.title} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Location" }} />
      <Stack.Screen name="setup" options={{ title: "Location Setup" }} />
    </Stack>
  );
}
