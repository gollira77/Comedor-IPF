import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
    esCategoriaValida,
    platosPorCategoria,
    type Plato,
} from "../../data/platos";
import TarjetaPlato from "../../components/TarjetaPlato";

export default function CategoriaScreen() {
    const { categoria } = useLocalSearchParams<{ categoria: string }>();

    // Validacion con type guard: si no es valida, mostramos mensaje
    if (!esCategoriaValida(categoria)) {
        return (
        <View style={estilos.contenedor}>
            <Stack.Screen options={{ title: "Categoría inválida" }} />
            <Text style={estilos.error}>
            La categoría "{categoria}" no existe.
            </Text>
            <Text style={estilos.ayuda}>
            Las categorías válidas son: desayuno, almuerzo, bebidas, kiosco.
            </Text>
        </View>
        );
    }

    // Si llegamos aca, TypeScript ya sabe que categoria es Categoria valida
    const platos = platosPorCategoria(categoria);

    return (
        <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: categoria.toUpperCase() }} />

        <Pressable
            onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
            style={({ pressed }) => ({
            ...estilos.volver,
            opacity: pressed ? 0.6 : 1,
            })}
        >
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
            <Text style={estilos.volverTexto}>Volver</Text>
        </Pressable>

        <FlatList
            style={estilos.lista}
            contentContainerStyle={estilos.contenido}
            data={platos}
            keyExtractor={(item: Plato) => String(item.id)}
            ListHeaderComponent={
            <View style={estilos.cabecera}>
                <Text style={estilos.cantidad}>
                {platos.length} plato(s) en esta categoría
                </Text>
            </View>
            }
            renderItem={({ item }) => (
            <Link
                href={{ pathname: "/menu/[id]", params: { id: item.id } }}
                asChild
            >
                <TarjetaPlato plato={item} />
            </Link>
            )}
            ListEmptyComponent={
            <Text style={estilos.vacio}>No hay platos en esta categoría.</Text>
            }
        />
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
    contenido: {
        padding: 16,
    },
    cabecera: {
        marginBottom: 12,
    },
    cantidad: {
        fontSize: 13,
        color: "#6b7280",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    vacio: {
        textAlign: "center",
        color: "#9ca3af",
        marginTop: 40,
    },
    error: {
        padding: 20,
        textAlign: "center",
        color: "#dc2626",
        fontSize: 16,
        fontWeight: "600",
    },
    ayuda: {
        textAlign: "center",
        color: "#6b7280",
        fontSize: 14,
        paddingHorizontal: 20,
    },
    volver: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignSelf: "flex-start",
    },
    volverTexto: {
        fontSize: 15,
        color: "#2563eb",
        fontWeight: "600",
    },
});