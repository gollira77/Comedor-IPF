import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../context/AppContext";

export default function Inicio() {
  const { usuario, cantidadEnEspera } = useApp();

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <View style={estilos.cabecera}>
        <Text style={estilos.titulo}>Comedor IPF</Text>
        {cantidadEnEspera > 0 && (
          <Text style={estilos.cola}>
            {cantidadEnEspera} pedido(s) en cola
          </Text>
        )}
      </View>

      <Text style={estilos.seccion}>Accesos rápidos</Text>

      <View style={estilos.tarjetas}>
        <Link href="/menu" asChild>
          <Tarjeta
            icono="restaurant-outline"
            titulo="Ver menú"
            descripcion="Platos agrupados por categoría"
            color="#2563eb"
          />
        </Link>

        <Link href="/buscar" asChild>
          <Tarjeta
            icono="search-outline"
            titulo="Buscar"
            descripcion="Encontrá un plato por nombre"
            color="#16a34a"
          />
        </Link>

        <Link href="/ayuda" asChild>
          <Tarjeta
            icono="help-circle-outline"
            titulo="Ayuda"
            descripcion="Pagos, horarios y más"
            color="#f59e0b"
          />
        </Link>

        {usuario ? (
          <Link href="/cocina" asChild>
            <Tarjeta
              icono="flame-outline"
              titulo="Cocina"
              descripcion="Atender pedidos"
              color="#dc2626"
            />
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Tarjeta
              icono="log-in-outline"
              titulo="Iniciar sesión"
              descripcion="Para el personal del comedor"
              color="#7c3aed"
            />
          </Link>
        )}
      </View>
    </ScrollView>
  );
}

// Componente interno de tarjeta.
// Usamos React.forwardRef para que Link con asChild le pase props correctamente.
import { Pressable, type PressableProps } from "react-native";
import React from "react";

interface PropsTarjeta extends PressableProps {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  descripcion: string;
  color: string;
}

const Tarjeta = React.forwardRef<View, PropsTarjeta>(
  ({ icono, titulo, descripcion, color, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={({ pressed }) => ({
          ...estilos.tarjeta,
          backgroundColor: pressed ? "#f3f4f6" : "white",
          borderLeftColor: color,
        })}
      >
        <Ionicons name={icono} size={32} color={color} />
        <View style={{ flex: 1 }}>
          <Text style={estilos.tarjetaTitulo}>{titulo}</Text>
          <Text style={estilos.tarjetaDescripcion}>{descripcion}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
      </Pressable>
    );
  }
);

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contenido: {
    padding: 20,
    paddingTop: 48,
  },
  cabecera: {
    marginBottom: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitulo: {
    fontSize: 18,
    color: "#4b5563",
    marginTop: 4,
  },
  cola: {
    marginTop: 8,
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "600",
  },
  seccion: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tarjetas: {
    gap: 12,
  },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tarjetaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  tarjetaDescripcion: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
});