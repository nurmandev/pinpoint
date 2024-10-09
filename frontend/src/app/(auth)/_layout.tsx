import { useAuth } from "@/src/context/Auth";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { user } = useAuth();

  if (user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    if (user === "partner") {
      return <Redirect href="/dashboard" />;
    } else {
      return <Redirect href="/" />;
    }
  }
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
    </Stack>
  );
}
