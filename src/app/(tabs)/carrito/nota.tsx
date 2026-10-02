import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { useApp } from "../../../context/AppContext";

export default function CarritoNota() {
    const { nota, setNota } = useApp();

    // Estado local para edicion. Solo se guarda en el context al tocar "Guardar".
    const [borrador, setBorrador] = useState(nota);

    const guardar = () => {
        setNota(borrador.trim());
        router.back();
    };

    const limpiar = () => {
        setBorrador("");
    };

    return (
        <KeyboardAvoidingView
        style={estilos.contenedor}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <View style={estilos.contenido}>
            <Text style={estilos.label}>Nota para la cocina</Text>
            <Text style={estilos.ayuda}>
            Aclaraciones como "sin sal", "sin mayonesa", "para llevar", etc.
            </Text>

            <TextInput
            value={borrador}
            onChangeText={setBorrador}
            placeholder="Escribí tu nota..."
            multiline
            numberOfLines={6}
            maxLength={200}
            style={estilos.input}
            textAlignVertical="top"
            />

            <Text style={estilos.contador}>{borrador.length} / 200</Text>

            <View style={estilos.botones}>
            <Pressable
                onPress={limpiar}
                style={({ pressed }) => ({
                ...estilos.botonSecundario,
                opacity: pressed ? 0.7 : 1,
                })}
            >
                <Ionicons name="trash-outline" size={18} color="#dc2626" />
                <Text style={{ ...estilos.botonSecundarioTexto, color: "#dc2626" }}>
                Limpiar
                </Text>
            </Pressable>

            <Pressable
                onPress={guardar}
                style={({ pressed }) => ({
                ...estilos.botonPrimario,
                opacity: pressed ? 0.8 : 1,
                })}
            >
                <Ionicons name="checkmark-outline" size={20} color="white" />
                <Text style={estilos.botonPrimarioTexto}>Guardar</Text>
            </Pressable>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    contenido: {
        padding: 20,
        gap: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    ayuda: {
        fontSize: 13,
        color: "#6b7280",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        color: "#111827",
        minHeight: 120,
    },
    contador: {
        textAlign: "right",
        fontSize: 12,
        color: "#9ca3af",
    },
    botones: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    botonSecundario: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "white",
    },
    botonSecundarioTexto: {
        fontSize: 15,
        fontWeight: "600",
    },
    botonPrimario: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#2563eb",
        paddingVertical: 12,
        borderRadius: 10,
    },
    botonPrimarioTexto: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
});