import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="verifyToken" options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
