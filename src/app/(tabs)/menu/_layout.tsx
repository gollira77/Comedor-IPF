import { Stack } from "expo-router";

export default function MenuLayout() {
    return (
        <Stack
        screenOptions={{
            headerStyle: { backgroundColor: "#2563eb" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
        }}
        >
        <Stack.Screen name="index" options={{ title: "Menú" }} />
        <Stack.Screen name="[id]" options={{ title: "Detalle" }} />
        </Stack>
  );
}