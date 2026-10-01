import { View, Text } from "react-native";
import { Link, usePathname } from "expo-router";

export default function NotFound() {
  const path = usePathname();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 48, fontWeight: "bold" }}>404</Text>
      <Text style={{ marginTop: 8 }}>La URL "{path}" no existe.</Text>
      <Link href="/" style={{ marginTop: 16, color: "blue" }}>
        Volver al inicio
      </Link>
    </View>
  );
}