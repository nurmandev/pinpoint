import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="camera" />
      <Stack.Screen name="addpost" />
      <Stack.Screen name="location" />
      {/* <Stack.Screen name="search" /> */}
      <Stack.Screen name="gallery" options={{ presentation: "modal" }} />
    </Stack>
  );
}
