import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="badges" />
      <Stack.Screen name="coupons" />
      <Stack.Screen name="notification_settings" />
      <Stack.Screen name="support" />
      <Stack.Screen name="favourites" />
    </Stack>
  );
}
