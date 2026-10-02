import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Link, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Articulos de ayuda disponibles.
const ARTICULOS = [
  {
    slug: "pagos/efectivo",
    titulo: "Pagar en efectivo",
    descripcion: "Cómo pagar al retirar tu pedido.",
    icono: "cash-outline" as const,
  },
  {
    slug: "pagos/transferencia",
    titulo: "Pagar por transferencia",
    descripcion: "Datos de la cuenta del comedor.",
    icono: "card-outline" as const,
  },
  {
    slug: "horarios",
    titulo: "Horarios de atención",
    descripcion: "Cuándo está abierto el comedor.",
    icono: "time-outline" as const,
  },
  {
    slug: "contacto",
    titulo: "Contacto",
    descripcion: "Cómo comunicarte con nosotros.",
    icono: "call-outline" as const,
  },
];

export default function AyudaIndex() {
  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen options={{ title: "Ayuda" }} />

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
        <Ionicons name="help-circle-outline" size={48} color="#f59e0b" />
        <Text style={estilos.titulo}>Centro de ayuda</Text>
        <Text style={estilos.subtitulo}>
          Encontrá información sobre pagos, horarios y más.
        </Text>
      </View>

      <Text style={estilos.seccionTitulo}>Artículos disponibles</Text>

      <View style={estilos.listaArticulos}>
        {ARTICULOS.map((art) => (
          <Link
            key={art.slug}
            href={`/ayuda/${art.slug}` as any}
            asChild
          >
            <Pressable
              style={({ pressed }) => ({
                ...estilos.articulo,
                backgroundColor: pressed ? "#f3f4f6" : "white",
              })}
            >
              <Ionicons name={art.icono} size={28} color="#f59e0b" />
              <View style={{ flex: 1 }}>
                <Text style={estilos.articuloTitulo}>{art.titulo}</Text>
                <Text style={estilos.articuloDescripcion}>
                  {art.descripcion}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </Link>
        ))}
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
    marginBottom: 24,
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
    textAlign: "center",
    paddingHorizontal: 20,
  },
  seccionTitulo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  listaArticulos: {
    gap: 10,
  },
  articulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  articuloTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  articuloDescripcion: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
});