import React from "react";
import { View, Text, Pressable, StyleSheet, type PressableProps } from "react-native";

import { Plato } from "../data/platos";

interface Props extends PressableProps {
    plato: Plato;
}

const TarjetaPlato = React.forwardRef<View, Props>(({ plato, ...props }, ref) => {
    return (
        <Pressable
        ref={ref}
        {...props}
        style={({ pressed }) => ({
            ...estilos.tarjeta,
            backgroundColor: pressed ? "#f3f4f6" : "white",
        })}
        >
        <View style={estilos.filaSuperior}>
            <Text style={estilos.nombre}>{plato.nombre}</Text>
            <Text style={estilos.precio}>${plato.precio}</Text>
        </View>
        <Text style={estilos.descripcion} numberOfLines={2}>
            {plato.descripcion}
        </Text>
        </Pressable>
    );
});

TarjetaPlato.displayName = "TarjetaPlato";

export default TarjetaPlato;

const estilos = StyleSheet.create({
    tarjeta: {
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 8,
    },
    filaSuperior: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nombre: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
        flex: 1,
    },
    precio: {
        fontSize: 16,
        fontWeight: "600",
        color: "#16a34a",
        marginLeft: 8,
    },
    descripcion: {
        fontSize: 13,
        color: "#6b7280",
        marginTop: 4,
    },
});