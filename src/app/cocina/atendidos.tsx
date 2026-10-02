import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../context/AppContext";
import { type Pedido } from "../../context/AppContext";
import { Plato } from "../../data/platos";

export default function CocinaAtendidos() {
  const { historialAtendidos } = useApp();

  // Formatear hora
  const formatearHora = (fecha: Date): string => {
    const h = fecha.getHours().toString().padStart(2, "0");
    const m = fecha.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  // Calcular total de un pedido
  const totalPedido = (items: Plato[]): number => {
    return items.reduce((sum, p) => sum + p.precio, 0);
  };

  if (historialAtendidos.length === 0) {
    return (
      <View style={estilos.vacio}>
        <Ionicons name="receipt-outline" size={64} color="#9ca3af" />
        <Text style={estilos.vacioTitulo}>Sin pedidos atendidos</Text>
        <Text style={estilos.vacioTexto}>
          Los pedidos que atiendas aparecerán acá, del más reciente al más antiguo.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
      data={historialAtendidos}
      keyExtractor={(item: Pedido) => String(item.numero)}
      ListHeaderComponent={
        <View style={estilos.cabecera}>
          <Text style={estilos.titulo}>Historial</Text>
          <Text style={estilos.subtitulo}>
            {historialAtendidos.length} pedido(s) atendido(s)
          </Text>
          <Text style={estilos.pista}>
            Más reciente arriba (pila LIFO)
          </Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <View style={estilos.tarjeta}>
          <View style={estilos.filaSuperior}>
            <View>
              <Text style={estilos.numeroLabel}>Turno</Text>
              <Text style={estilos.numero}>N° {item.numero}</Text>
            </View>
            <View style={estilos.posicionCaja}>
              <Text style={estilos.posicionTexto}>
                {index === 0 ? "ÚLTIMO" : `#${index + 1}`}
              </Text>
            </View>
            <View style={estilos.horaCaja}>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
              <Text style={estilos.horaTexto}>{formatearHora(item.fecha)}</Text>
            </View>
          </View>

          <View style={estilos.itemsContenedor}>
            {item.items.map((plato, i) => (
              <Text key={i} style={estilos.itemLinea}>
                • {plato.nombre}{" "}
                <Text style={estilos.itemPrecio}>${plato.precio}</Text>
              </Text>
            ))}
          </View>

          {item.nota.length > 0 && (
            <View style={estilos.notaCaja}>
              <Text style={estilos.notaLabel}>Nota:</Text>
              <Text style={estilos.notaTexto}>{item.nota}</Text>
            </View>
          )}

          <View style={estilos.filaInferior}>
            <Text style={estilos.totalLabel}>Total</Text>
            <Text style={estilos.totalValor}>${totalPedido(item.items)}</Text>
          </View>
        </View>
      )}
    />
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
  cabecera: {
    marginBottom: 8,
    gap: 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  pista: {
    fontSize: 11,
    color: "#9ca3af",
    fontStyle: "italic",
    marginTop: 4,
  },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 10,
  },
  filaSuperior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  numeroLabel: {
    fontSize: 10,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "600",
  },
  numero: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
  },
  posicionCaja: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#dbeafe",
    borderRadius: 6,
  },
  posicionTexto: {
    fontSize: 10,
    color: "#1e40af",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  horaCaja: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  horaTexto: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  itemsContenedor: {
    gap: 2,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    paddingTop: 8,
    paddingBottom: 8,
  },
  itemLinea: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
  itemPrecio: {
    fontSize: 13,
    color: "#16a34a",
    fontWeight: "600",
  },
  notaCaja: {
    flexDirection: "row",
    gap: 6,
    padding: 8,
    backgroundColor: "#fef3c7",
    borderRadius: 6,
  },
  notaLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#92400e",
  },
  notaTexto: {
    fontSize: 12,
    color: "#78350f",
    flex: 1,
  },
  filaInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "600",
  },
  totalValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
  },
  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 10,
    backgroundColor: "#f9fafb",
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
});