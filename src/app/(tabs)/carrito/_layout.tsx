import { Stack } from "expo-router";

export default function CarritoLayout() {
    return (
        <Stack
        screenOptions={{
            headerStyle: { backgroundColor: "#2563eb" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
        }}
        >
        <Stack.Screen name="index" options={{ title: "Mi carrito" }} />
        <Stack.Screen name="nota" options={{ title: "Nota para cocina" }} />
        </Stack>
    );
}