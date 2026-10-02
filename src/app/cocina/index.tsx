import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../context/AppContext";

export default function CocinaIndex() {
  const { usuario, cerrarSesion, cantidadEnEspera } = useApp();

  const confirmarSalir = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que querés salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => {
            cerrarSesion();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <Ionicons name="flame" size={48} color="#dc2626" />
        <Text style={estilos.titulo}>Panel de cocina</Text>
        <Text style={estilos.subtitulo}>Logueado como: {usuario}</Text>
      </View>

      <View style={estilos.infoCaja}>
        <Text style={estilos.infoLabel}>Pedidos en cola</Text>
        <Text style={estilos.infoValor}>{cantidadEnEspera}</Text>
      </View>

      <Text style={estilos.aviso}>
        La lógica de atender pedidos se implementa en el próximo paso.
      </Text>

      <Pressable
        onPress={confirmarSalir}
        style={({ pressed }) => ({
          ...estilos.botonSalir,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={estilos.botonSalirTexto}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb",
    gap: 16,
  },
  cabecera: {
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoCaja: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoLabel: {
    fontSize: 13,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  infoValor: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#dc2626",
    marginTop: 4,
  },
  aviso: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    fontStyle: "italic",
  },
  botonSalir: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: "auto",
  },
  botonSalirTexto: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});