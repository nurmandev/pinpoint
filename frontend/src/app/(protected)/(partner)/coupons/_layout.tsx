import useDimensions from "@/src/hooks/useDimension";
import { Stack, router } from "expo-router";
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
      <Stack.Screen name="index" options={{ title: "Coupons" }} />
      <Stack.Screen name="add" options={{ title: "Generate Coupon" }} />
    </Stack>
  );
}
