import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CocinaAtendidos() {
  return (
    <View style={estilos.contenedor}>
      <Ionicons name="checkmark-done-outline" size={48} color="#6b7280" />
      <Text style={estilos.titulo}>Pedidos atendidos</Text>
      <Text style={estilos.subtitulo}>
        El historial se implementa en el próximo paso.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 8,
    backgroundColor: "#f9fafb",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});