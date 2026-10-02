import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Stack, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * Contenido de los articulos.
 * La clave es el slug (segmentos unidos por "/") y el valor es el articulo.
 */
const CONTENIDO: Record<string, { titulo: string; cuerpo: string }> = {
  "pagos/efectivo": {
    titulo: "Pagar en efectivo",
    cuerpo:
      "Al confirmar tu pedido, el sistema te asigna un número de turno. " +
      "Dirigite al mostrador del comedor con tu número y abonás en efectivo " +
      "antes de retirar la comida. Aceptamos billetes y monedas de curso legal.",
  },
  "pagos/transferencia": {
    titulo: "Pagar por transferencia",
    cuerpo:
      "Podés transferir al CBU: 0000000000000000000000. Titular: Comedor IPF. " +
      "Enviá el comprobante al WhatsApp del comedor junto con tu número de turno.",
  },
  horarios: {
    titulo: "Horarios de atención",
    cuerpo:
      "Lunes a viernes: 7:30 a 20:00 hs. Desayuno: 7:30 a 10:30. " +
      "Almuerzo: 11:30 a 15:00. Merienda: 15:30 a 18:30.",
  },
  contacto: {
    titulo: "Contacto",
    cuerpo:
      "WhatsApp del comedor: +54 370 XXX-XXXX. Email: comedor@ipf.edu.ar. " +
      "También podés hablar con el personal en el mostrador.",
  },
};

export default function ArticuloAyuda() {
  // useLocalSearchParams con [...slug] devuelve el slug como string[]
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  // Reconstruimos el slug uniendo los segmentos con "/"
  // Ej: ["pagos", "efectivo"] → "pagos/efectivo"
  const slugCompleto = Array.isArray(slug) ? slug.join("/") : slug;

  const articulo = CONTENIDO[slugCompleto];

  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/ayuda");
    }
  };

  // Si no existe el articulo, mostramos un mensaje
  if (!articulo) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: "Artículo no encontrado" }} />

        <View style={estilos.vacio}>
          <Ionicons name="document-outline" size={64} color="#9ca3af" />
          <Text style={estilos.vacioTitulo}>Artículo no encontrado</Text>
          <Text style={estilos.vacioTexto}>
            No existe el artículo "{slugCompleto}".
          </Text>

          <Link href="/ayuda" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...estilos.botonVolver,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Ionicons name="arrow-back" size={18} color="white" />
              <Text style={estilos.botonVolverTexto}>Volver al índice</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  // Articulo encontrado: mostramos el contenido
  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen options={{ title: articulo.titulo }} />

      <Pressable
        onPress={volver}
        style={({ pressed }) => ({
          ...estilos.volver,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Ionicons name="arrow-back" size={20} color="#2563eb" />
        <Text style={estilos.volverTexto}>Volver</Text>
      </Pressable>

      <View style={estilos.cabecera}>
        <Ionicons name="document-text-outline" size={40} color="#f59e0b" />
        <Text style={estilos.titulo}>{articulo.titulo}</Text>
        <Text style={estilos.ruta}>/{slugCompleto}</Text>
      </View>

      <View style={estilos.cuerpoCaja}>
        <Text style={estilos.cuerpo}>{articulo.cuerpo}</Text>
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
    padding: 16,
    paddingTop: 24,
  },
  volver: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  volverTexto: {
    fontSize: 15,
    color: "#2563eb",
    fontWeight: "600",
  },
  cabecera: {
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
    textAlign: "center",
  },
  ruta: {
    fontSize: 12,
    color: "#9ca3af",
    fontFamily: "monospace",
    marginTop: 4,
  },
  cuerpoCaja: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cuerpo: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
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
  botonVolver: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  botonVolverTexto: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});