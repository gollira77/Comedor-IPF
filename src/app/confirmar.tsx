import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../context/AppContext";
import { Plato } from "../data/platos";

export default function Confirmar() {
  const {
    carrito,
    totalCarrito,
    carritoVacio,
    nota,
    confirmarPedido,
  } = useApp();

  // Si por alguna razon llegamos aca sin items, cerramos el modal
  if (carritoVacio) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: "Nada que confirmar" }} />
        <View style={estilos.vacio}>
          <Ionicons name="alert-circle-outline" size={48} color="#dc2626" />
          <Text style={estilos.vacioTexto}>
            No hay nada en tu carrito.
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              ...estilos.botonSecundario,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={estilos.botonSecundarioTexto}>Volver</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const confirmar = () => {
    // Confirmamos el pedido: encola y devuelve el numero de turno
    const numero = confirmarPedido();

    // Usamos REPLACE (no push) para que "atras" no vuelva a esta pantalla.
    // Asi evitamos que el usuario confirme el mismo pedido dos veces.
    router.replace({
      pathname: "/turno/[numero]",
      params: { numero },
    });
  };

  const cancelar = () => {
    Alert.alert(
      "Cancelar",
      "¿Querés volver sin confirmar?",
      [
        { text: "Seguir confirmando", style: "cancel" },
        {
          text: "Volver",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <FlatList
        style={estilos.lista}
        contentContainerStyle={estilos.listaContenido}
        data={carrito}
        keyExtractor={(_item: Plato, index: number) => `${index}`}
        ListHeaderComponent={
          <View style={estilos.cabecera}>
            <Ionicons name="receipt-outline" size={32} color="#2563eb" />
            <Text style={estilos.titulo}>Resumen del pedido</Text>
            <Text style={estilos.subtitulo}>
              Revisá tus platos antes de confirmar
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={estilos.item}>
            <Text style={estilos.itemNumero}>{index + 1}.</Text>
            <View style={{ flex: 1 }}>
              <Text style={estilos.itemNombre}>{item.nombre}</Text>
              <Text style={estilos.itemCategoria}>{item.categoria}</Text>
            </View>
            <Text style={estilos.itemPrecio}>${item.precio}</Text>
          </View>
        )}
        ListFooterComponent={
          nota.length > 0 ? (
            <View style={estilos.notaCaja}>
              <Text style={estilos.notaLabel}>Nota para cocina</Text>
              <Text style={estilos.notaTexto}>{nota}</Text>
            </View>
          ) : null
        }
      />

      {/* Panel inferior fijo */}
      <View style={estilos.panelInferior}>
        <View style={estilos.filaTotal}>
          <Text style={estilos.totalLabel}>Total a pagar</Text>
          <Text style={estilos.totalValor}>${totalCarrito}</Text>
        </View>

        <View style={estilos.filaBotones}>
          <Pressable
            onPress={cancelar}
            style={({ pressed }) => ({
              ...estilos.botonSecundario,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={estilos.botonSecundarioTexto}>Cancelar</Text>
          </Pressable>

          <Pressable
            onPress={confirmar}
            style={({ pressed }) => ({
              ...estilos.botonConfirmar,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Ionicons name="checkmark-circle" size={22} color="white" />
            <Text style={estilos.botonConfirmarTexto}>Confirmar pedido</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  lista: {
    flex: 1,
  },
  listaContenido: {
    padding: 20,
    paddingBottom: 20,
  },
  cabecera: {
    alignItems: "center",
    marginBottom: 20,
    gap: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  itemNumero: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2563eb",
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
  itemPrecio: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16a34a",
  },
  notaCaja: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  notaLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#92400e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  notaTexto: {
    fontSize: 14,
    color: "#78350f",
  },
  panelInferior: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 12,
  },
  filaTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
  totalValor: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#16a34a",
  },
  filaBotones: {
    flexDirection: "row",
    gap: 10,
  },
  botonSecundario: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  botonSecundarioTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  botonConfirmar: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 10,
  },
  botonConfirmarTexto: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 32,
  },
  vacioTexto: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});