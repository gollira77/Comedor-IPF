import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../context/AppContext";
import { Plato } from "../../data/platos";

export default function CocinaIndex() {
  const {
    usuario,
    cerrarSesion,
    pedidoActual,
    cantidadEnEspera,
    atenderSiguiente,
    historialAtendidos,
  } = useApp();

  const atender = () => {
    if (!pedidoActual) return;

    Alert.alert(
      "Atender pedido",
      `¿Confirmás que atendiste el pedido N° ${pedidoActual.numero}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, atendido",
          onPress: () => atenderSiguiente(),
        },
      ]
    );
  };

  const salir = () => {
    cerrarSesion();
    // El guard de cocina pasa a false → el usuario sale solo
  };

  // Formatear hora de un pedido
  const formatearHora = (fecha: Date): string => {
    const h = fecha.getHours().toString().padStart(2, "0");
    const m = fecha.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <View style={estilos.contenedor}>
      {/* Cabecera */}
      <View style={estilos.cabecera}>
        <View>
          <Text style={estilos.saludo}>Hola, {usuario} 👨‍🍳</Text>
          <Text style={estilos.estado}>
            {cantidadEnEspera > 0
              ? `${cantidadEnEspera} pedido(s) en espera`
              : "Sin pedidos en cola"}
          </Text>
        </View>
        <Pressable
          onPress={salir}
          style={({ pressed }) => ({
            ...estilos.botonSalir,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons name="log-out-outline" size={18} color="#dc2626" />
          <Text style={estilos.botonSalirTexto}>Salir</Text>
        </Pressable>
      </View>

      {/* Pedido actual o estado vacío */}
      {pedidoActual ? (
        <View style={estilos.contenidoCentral}>
          <View style={estilos.tarjetaPedido}>
            <View style={estilos.pedidoCabecera}>
              <View>
                <Text style={estilos.pedidoLabel}>Pedido actual</Text>
                <Text style={estilos.pedidoNumero}>
                  N° {pedidoActual.numero}
                </Text>
              </View>
              <View style={estilos.horaCaja}>
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <Text style={estilos.horaTexto}>
                  {formatearHora(pedidoActual.fecha)}
                </Text>
              </View>
            </View>

            <View style={estilos.separador} />

            <Text style={estilos.itemsLabel}>
              Ítems ({pedidoActual.items.length})
            </Text>

            <FlatList
              data={pedidoActual.items}
              scrollEnabled={false}
              keyExtractor={(_item: Plato, index: number) => `${index}`}
              renderItem={({ item, index }) => (
                <View style={estilos.item}>
                  <Text style={estilos.itemNumero}>{index + 1}.</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.itemNombre}>{item.nombre}</Text>
                    <Text style={estilos.itemCategoria}>{item.categoria}</Text>
                  </View>
                </View>
              )}
            />

            {pedidoActual.nota.length > 0 && (
              <View style={estilos.notaCaja}>
                <Ionicons name="alert-circle" size={16} color="#92400e" />
                <View style={{ flex: 1 }}>
                  <Text style={estilos.notaLabel}>Nota</Text>
                  <Text style={estilos.notaTexto}>{pedidoActual.nota}</Text>
                </View>
              </View>
            )}
          </View>

          <Pressable
            onPress={atender}
            style={({ pressed }) => ({
              ...estilos.botonAtender,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={estilos.botonAtenderTexto}>Atender siguiente</Text>
          </Pressable>
        </View>
      ) : (
        <View style={estilos.vacio}>
          <Ionicons name="moon-outline" size={64} color="#9ca3af" />
          <Text style={estilos.vacioTitulo}>No hay pedidos</Text>
          <Text style={estilos.vacioTexto}>
            Cuando un alumno confirme un pedido, aparecerá acá.
          </Text>

          {historialAtendidos.length > 0 && (
            <Link href="/cocina/atendidos" asChild>
              <Pressable
                style={({ pressed }) => ({
                  ...estilos.botonHistorial,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Ionicons
                  name="checkmark-done-outline"
                  size={18}
                  color="#2563eb"
                />
                <Text style={estilos.botonHistorialTexto}>
                  Ver historial ({historialAtendidos.length})
                </Text>
              </Pressable>
            </Link>
          )}
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    gap: 16,
  },
  cabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  saludo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  estado: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  botonSalir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  botonSalirTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#dc2626",
  },
  contenidoCentral: {
    flex: 1,
    gap: 16,
  },
  tarjetaPedido: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#dc2626",
    gap: 10,
  },
  pedidoCabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pedidoLabel: {
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  pedidoNumero: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#dc2626",
    marginTop: 2,
  },
  horaCaja: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
  },
  horaTexto: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
  },
  separador: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
  },
  itemsLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  itemNumero: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#dc2626",
    width: 24,
  },
  itemNombre: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  itemCategoria: {
    fontSize: 11,
    color: "#9ca3af",
    textTransform: "uppercase",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  notaCaja: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f59e0b",
    marginTop: 8,
  },
  notaLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#92400e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  notaTexto: {
    fontSize: 13,
    color: "#78350f",
    marginTop: 2,
  },
  botonAtender: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: "auto",
  },
  botonAtenderTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 10,
  },
  vacioTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 8,
  },
  vacioTexto: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  botonHistorial: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "white",
  },
  botonHistorialTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
});