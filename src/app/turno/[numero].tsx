import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../context/AppContext";

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { posicionEnCola, cantidadEnEspera } = useApp();

  const nroTurno = Number(numero);

  if (isNaN(nroTurno)) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={estilos.error}>Número de turno inválido: {numero}</Text>
        <Pressable
          onPress={() => router.replace("/")}
          style={({ pressed }) => ({
            ...estilos.botonPrimario,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={estilos.botonPrimarioTexto}>Volver al inicio</Text>
        </Pressable>
      </View>
    );
  }

  // Posicion en la cola (0 = al frente, -1 = ya fue atendido)
  const posicion = posicionEnCola(nroTurno);
  const yaAtendido = posicion === -1;
  const esElSiguiente = posicion === 0;
  const adelantes = posicion > 0 ? posicion : 0;

  // Tiempo estimado: 3 minutos por pedido adelante (desafio opcional G4)
  const minutosEspera = adelantes * 3;

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen options={{ title: "Tu turno" }} />

      <View style={estilos.cajaNumero}>
        <Text style={estilos.cajaLabel}>Tu número de turno</Text>
        <Text style={estilos.cajaNumeroTexto}>{nroTurno}</Text>
      </View>

      <View style={estilos.estadoCaja}>
        {yaAtendido ? (
          <>
            <Ionicons name="checkmark-done-circle" size={48} color="#16a34a" />
            <Text style={estilos.estadoTitulo}>¡Pedido atendido!</Text>
            <Text style={estilos.estadoTexto}>
              Tu pedido ya fue preparado.
            </Text>
          </>
        ) : esElSiguiente ? (
          <>
            <Ionicons name="flame" size={48} color="#f59e0b" />
            <Text style={estilos.estadoTitulo}>¡Sos el siguiente!</Text>
            <Text style={estilos.estadoTexto}>
              Tu pedido se está preparando ahora.
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="time-outline" size={48} color="#2563eb" />
            <Text style={estilos.estadoTitulo}>En cola</Text>
            <Text style={estilos.estadoTexto}>
              Hay {adelantes} pedido(s) adelante tuyo.
            </Text>
            <Text style={estilos.estadoTiempo}>
              Espera estimada: ~{minutosEspera} min
            </Text>
          </>
        )}
      </View>

      <View style={estilos.cola}>
        <Ionicons name="people-outline" size={18} color="#6b7280" />
        <Text style={estilos.colaTexto}>
          Pedidos en cola: {cantidadEnEspera}
        </Text>
      </View>

      <View style={estilos.botones}>
        <Pressable
          onPress={() => router.replace("/")}
          style={({ pressed }) => ({
            ...estilos.botonPrimario,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Ionicons name="home-outline" size={20} color="white" />
          <Text style={estilos.botonPrimarioTexto}>Volver al inicio</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/menu")}
          style={({ pressed }) => ({
            ...estilos.botonSecundario,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons name="restaurant-outline" size={20} color="#2563eb" />
          <Text style={estilos.botonSecundarioTexto}>Hacer otro pedido</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contenido: {
    padding: 20,
    gap: 16,
  },
  cajaNumero: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#2563eb",
    borderRadius: 16,
  },
  cajaLabel: {
    fontSize: 13,
    color: "#bfdbfe",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  cajaNumeroTexto: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  estadoCaja: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 6,
  },
  estadoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  estadoTexto: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  estadoTiempo: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 4,
  },
  cola: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  colaTexto: {
    fontSize: 13,
    color: "#6b7280",
  },
  botones: {
    gap: 10,
    marginTop: 16,
  },
  botonPrimario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
  },
  botonPrimarioTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  botonSecundarioTexto: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    padding: 20,
    textAlign: "center",
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
});