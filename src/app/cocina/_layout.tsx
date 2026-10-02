import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function CocinaLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#dc2626" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
        drawerActiveTintColor: "#dc2626",
        drawerInactiveTintColor: "#374151",
        drawerStyle: {
          backgroundColor: "#f9fafb",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Cocina",
          drawerLabel: "Atender pedidos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flame-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="atendidos"
        options={{
          title: "Historial",
          drawerLabel: "Pedidos atendidos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}