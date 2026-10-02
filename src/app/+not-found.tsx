import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, usePathname, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NotFound() {
  const pathname = usePathname();

  const volverAtras = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: "Página no encontrada" }} />

      <View style={estilos.contenido}>
        <Ionicons name="alert-circle-outline" size={80} color="#dc2626" />

        <Text style={estilos.codigo}>404</Text>
        <Text style={estilos.titulo}>Página no encontrada</Text>

        <View style={estilos.urlCaja}>
          <Text style={estilos.urlLabel}>URL solicitada:</Text>
          <Text style={estilos.urlTexto}>{pathname}</Text>
        </View>

        <Text style={estilos.ayuda}>
          La ruta que buscás no existe o fue movida.
        </Text>

        <View style={estilos.botones}>
          <Pressable
            onPress={volverAtras}
            style={({ pressed }) => ({
              ...estilos.botonSecundario,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons name="arrow-back" size={18} color="#374151" />
            <Text style={estilos.botonSecundarioTexto}>Volver</Text>
          </Pressable>

          <Link href="/" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...estilos.botonPrimario,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Ionicons name="home-outline" size={18} color="white" />
              <Text style={estilos.botonPrimarioTexto}>Ir al Inicio</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  contenido: {
    alignItems: "center",
    gap: 10,
    maxWidth: 400,
  },
  codigo: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#dc2626",
    marginTop: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  urlCaja: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
    alignItems: "center",
    gap: 2,
  },
  urlLabel: {
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "600",
  },
  urlTexto: {
    fontSize: 14,
    color: "#374151",
    fontFamily: "monospace",
  },
  ayuda: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 20,
  },
  botones: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
  },
  botonSecundario: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  botonSecundarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  botonPrimario: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  botonPrimarioTexto: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});