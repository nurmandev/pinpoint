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
        header: ({ options, route }) => (
          <Appbar.Header style={{ backgroundColor: "#fff" }}>
            {router.canGoBack() && isMobile && (
              <Appbar.BackAction onPress={() => router.back()} />
            )}
            <Appbar.Content title={options.title} />
            {route.name === "index" && (
              <Appbar.Action
                icon={"plus-circle-outline"}
                onPress={() => router.push("/products/add")}
              />
            )}
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Products" }} />
      <Stack.Screen name="add" options={{ title: "Add Product" }} />
      <Stack.Screen name="[id]" options={{ title: "Product" }} />
    </Stack>
  );
}
