import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { buscarPlato } from "../../../data/platos";
import { useApp } from "../../../context/AppContext";

export default function DetallePlato() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { agregarAlCarrito, carrito } = useApp();

    // Convertir string a numero (los params siempre llegan como string)
    const idNumerico = Number(id);

    // Validacion 1: que el id sea un numero valido
    if (isNaN(idNumerico)) {
        return (
        <View style={estilos.contenedor}>
            <Stack.Screen options={{ title: "Error" }} />
            <Text style={estilos.error}>El id "{id}" no es valido.</Text>
        </View>
        );
    }

    // Validacion 2: que el plato exista en los datos
    const plato = buscarPlato(idNumerico);

    if (!plato) {
        return (
        <View style={estilos.contenedor}>
            <Stack.Screen options={{ title: "No encontrado" }} />
            <Text style={estilos.error}>No existe el plato con id {id}.</Text>
        </View>
        );
    }

    const agregar = () => {
        agregarAlCarrito(plato);
        Alert.alert(
        "Agregado",
        `"${plato.nombre}" se agregó al carrito.`,
        [
            { text: "Seguir pidiendo", style: "cancel" },
            { text: "Ver carrito", onPress: () => router.push("/carrito") },
        ]
        );
    };

    return (
        <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
        {/* Titulo dinamico del header */}
        <Stack.Screen options={{ title: plato.nombre }} />

        <Pressable
            onPress={() => {
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace("/menu");
            }
            }}
            style={({ pressed }) => ({
            ...estilos.volver,
            opacity: pressed ? 0.6 : 1,
            })}
        >
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
            <Text style={estilos.volverTexto}>Volver</Text>
        </Pressable>

        <View style={estilos.cabecera}>
            <Text style={estilos.categoria}>{plato.categoria.toUpperCase()}</Text>
            <Text style={estilos.nombre}>{plato.nombre}</Text>
            <Text style={estilos.precio}>${plato.precio}</Text>
        </View>

        <View style={estilos.descripcionCaja}>
            <Text style={estilos.descripcionTitulo}>Descripción</Text>
            <Text style={estilos.descripcion}>{plato.descripcion}</Text>
        </View>

        <View style={estilos.carritoInfo}>
            <Ionicons name="cart-outline" size={20} color="#6b7280" />
            <Text style={estilos.carritoTexto}>
            Carrito: {carrito.length} ítem(s)
            </Text>
        </View>

        <Pressable
            onPress={agregar}
            style={({ pressed }) => ({
            ...estilos.boton,
            opacity: pressed ? 0.8 : 1,
            })}
        >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={estilos.botonTexto}>Agregar al carrito</Text>
        </Pressable>
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
    },
    cabecera: {
        marginBottom: 24,
    },
    categoria: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#2563eb",
        letterSpacing: 1,
        marginBottom: 4,
    },
    nombre: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 8,
    },
    precio: {
        fontSize: 24,
        fontWeight: "600",
        color: "#16a34a",
    },
    descripcionCaja: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    descripcionTitulo: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#6b7280",
        marginBottom: 6,
    },
    descripcion: {
        fontSize: 15,
        color: "#374151",
        lineHeight: 22,
    },
    carritoInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 16,
    },
    carritoTexto: {
        fontSize: 14,
        color: "#6b7280",
    },
    boton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 10,
    },
    botonTexto: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        padding: 20,
        textAlign: "center",
        color: "#dc2626",
        fontSize: 16,
    },
    volver: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 16,
        paddingVertical: 6,
        alignSelf: "flex-start",
    },
    volverTexto: {
        fontSize: 15,
        color: "#2563eb",
        fontWeight: "600",
    },
});