import useDimensions from "@/src/hooks/useDimension";
import { Stack, router } from "expo-router";
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
                onPress={() => router.push("/services/add")}
              />
            )}
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Services" }} />
      <Stack.Screen name="add" options={{ title: "Add Service" }} />
    </Stack>
  );
}
