import {
    View,
    Text,
    FlatList,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../../../context/AppContext";
import { Plato } from "../../../data/platos";

export default function CarritoIndex() {
    const {
        carrito,
        totalCarrito,
        puedeDeshacer,
        deshacerUltimo,
        carritoVacio,
        nota,
        limpiarCarrito,
    } = useApp();

    const confirmar = () => {
        if (carritoVacio) {
        Alert.alert("Carrito vacío", "Agregá al menos un plato para confirmar.");
        return;
        }
        router.push("/confirmar");
    };

    const vaciar = () => {
        if (carritoVacio) return;
        Alert.alert(
        "Vaciar carrito",
        "¿Seguro que querés quitar todos los platos?",
        [
            { text: "Cancelar", style: "cancel" },
            {
            text: "Vaciar",
            style: "destructive",
            onPress: limpiarCarrito,
            },
        ]
        );
    };

    // Si el carrito está vacío, mostramos un estado de "nada todavía"
    if (carritoVacio) {
        return (
        <View style={estilos.vacioContenedor}>
            <Ionicons name="cart-outline" size={64} color="#9ca3af" />
            <Text style={estilos.vacioTitulo}>Tu carrito está vacío</Text>
            <Text style={estilos.vacioTexto}>
            Agregá platos desde el menú.
            </Text>

            <Link href="/menu" asChild>
            <Pressable
                style={({ pressed }) => ({
                ...estilos.vacioBoton,
                opacity: pressed ? 0.8 : 1,
                })}
            >
                <Ionicons name="restaurant-outline" size={20} color="white" />
                <Text style={estilos.vacioBotonTexto}>Ir al menú</Text>
            </Pressable>
            </Link>
        </View>
        );
    }

    return (
        <View style={estilos.contenedor}>
        <FlatList
            style={estilos.lista}
            contentContainerStyle={estilos.listaContenido}
            data={carrito}
            keyExtractor={(_item: Plato, index: number) => `${index}`}
            renderItem={({ item, index }) => (
            <View style={estilos.item}>
                <View style={{ flex: 1 }}>
                <Text style={estilos.itemNombre}>
                    {index + 1}. {item.nombre}
                </Text>
                <Text style={estilos.itemCategoria}>{item.categoria}</Text>
                </View>
                <Text style={estilos.itemPrecio}>${item.precio}</Text>
            </View>
            )}
            ListHeaderComponent={
            <View style={estilos.cabecera}>
                <Text style={estilos.contador}>
                {carrito.length} ítem(s) en el carrito
                </Text>
            </View>
            }
            ListFooterComponent={
            <View style={estilos.pie}>
                <Link href="/carrito/nota" asChild>
                <Pressable
                    style={({ pressed }) => ({
                    ...estilos.notaLink,
                    backgroundColor: pressed ? "#f3f4f6" : "white",
                    })}
                >
                    <Ionicons name="document-text-outline" size={20} color="#374151" />
                    <View style={{ flex: 1 }}>
                    <Text style={estilos.notaLabel}>Nota para cocina</Text>
                    <Text style={estilos.notaValor} numberOfLines={1}>
                        {nota.length > 0 ? nota : "(sin nota)"}
                    </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </Pressable>
                </Link>
            </View>
            }
        />

        {/* Panel inferior fijo con total y botones */}
        <View style={estilos.panelInferior}>
            <View style={estilos.filaTotal}>
            <Text style={estilos.totalLabel}>Total</Text>
            <Text style={estilos.totalValor}>${totalCarrito}</Text>
            </View>

            <View style={estilos.filaBotones}>
            <Pressable
                onPress={deshacerUltimo}
                disabled={!puedeDeshacer}
                style={({ pressed }) => ({
                ...estilos.botonSecundario,
                opacity: !puedeDeshacer ? 0.4 : pressed ? 0.7 : 1,
                })}
            >
                <Ionicons name="arrow-undo-outline" size={18} color="#374151" />
                <Text style={estilos.botonSecundarioTexto}>Deshacer</Text>
            </Pressable>

            <Pressable
                onPress={vaciar}
                style={({ pressed }) => ({
                ...estilos.botonSecundario,
                opacity: pressed ? 0.7 : 1,
                })}
            >
                <Ionicons name="trash-outline" size={18} color="#dc2626" />
                <Text style={{ ...estilos.botonSecundarioTexto, color: "#dc2626" }}>
                Vaciar
                </Text>
            </Pressable>
            </View>

            <Pressable
            onPress={confirmar}
            style={({ pressed }) => ({
                ...estilos.botonConfirmar,
                opacity: pressed ? 0.8 : 1,
            })}
            >
            <Ionicons name="checkmark-circle-outline" size={22} color="white" />
            <Text style={estilos.botonConfirmarTexto}>Confirmar pedido</Text>
            </Pressable>
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
        padding: 16,
        paddingBottom: 20,
    },
    cabecera: {
        marginBottom: 12,
    },
    contador: {
        fontSize: 13,
        color: "#6b7280",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "white",
        borderRadius: 8,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "#e5e7eb",
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
        marginLeft: 12,
    },
    pie: {
        marginTop: 12,
    },
    notaLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    notaLabel: {
        fontSize: 13,
        color: "#6b7280",
        fontWeight: "600",
    },
    notaValor: {
        fontSize: 14,
        color: "#111827",
        marginTop: 2,
    },
    panelInferior: {
        padding: 16,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 10,
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
        fontSize: 22,
        fontWeight: "bold",
        color: "#16a34a",
    },
    filaBotones: {
        flexDirection: "row",
        gap: 8,
    },
    botonSecundario: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    botonSecundarioTexto: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },
    botonConfirmar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#16a34a",
        paddingVertical: 14,
        borderRadius: 10,
    },
    botonConfirmarTexto: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    // Estados vacio
    vacioContenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        backgroundColor: "#f9fafb",
        gap: 12,
    },
    vacioTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#374151",
    },
    vacioTexto: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
    },
    vacioBoton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#2563eb",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    vacioBotonTexto: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
});