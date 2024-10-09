import SplashScreen from "@/src/components/SplashScreen";
import Onboarding from "@/src/components/onboarding/Onboarding";
import { useAuth } from "@/src/context/Auth";
import { useUser } from "@/src/context/User";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function Layout() {
  const { loading, onboardingCompleted } = useAuth();
  const { user } = useUser();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <SplashScreen />;
  }

  if (!onboardingCompleted && Platform.OS !== "web") {
    return <Onboarding />;
  }
  if (!user) {
    return <Redirect href="/login" />;
  } else if (!user.isVerified) {
    return <Redirect href="/verify" />;
  }

  // if (user && user === "partner") {
  //   return <Redirect href="/dashboard" />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(socialpost)" />
      <Stack.Screen name="(explores)" />
      <Stack.Screen name="(menu)" />
      <Stack.Screen name="(partner)" />
    </Stack>
  );
}
