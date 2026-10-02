import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
} from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
    platos,
    CATEGORIAS,
    type Plato,
} from "../data/platos";
import TarjetaPlato from "../components/TarjetaPlato";

export default function Buscar() {
    // Leemos los params de la URL (ambos opcionales)
    const { q, categoria } = useLocalSearchParams<{
        q?: string;
        categoria?: string;
    }>();

    // Normalizamos los valores
    const texto = q ?? "";
    const catActiva = categoria ?? "todas";

    // Filtramos los platos segun los dos criterios
    const resultados = platos.filter((p: Plato) => {
        const matchTexto =
        texto.length === 0 ||
        p.nombre.toLowerCase().includes(texto.toLowerCase());

        const matchCategoria = catActiva === "todas" || p.categoria === catActiva;

        return matchTexto && matchCategoria;
    });

    // Al tocar un chip de categoria
    const seleccionarCategoria = (cat: string) => {
        if (cat === "todas") {
        router.setParams({ categoria: undefined });
        } else {
        router.setParams({ categoria: cat });
        }
    };

    const limpiar = () => {
        router.setParams({ q: undefined, categoria: undefined });
    };

    const volver = () => {
        if (router.canGoBack()) {
        router.back();
        } else {
        router.replace("/");
        }
    };

    const todasLasOpciones: string[] = ["todas", ...CATEGORIAS];

    return (
        <View style={estilos.contenedor}>
        {/* Botón volver manual */}
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

        {/* Caja de busqueda */}
        <View style={estilos.cajaBusqueda}>
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
            value={texto}
            onChangeText={(nuevo) => router.setParams({ q: nuevo })}
            placeholder="Buscar plato..."
            style={estilos.input}
            autoCapitalize="none"
            autoCorrect={false}
            />
            {texto.length > 0 && (
            <Pressable onPress={() => router.setParams({ q: undefined })}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </Pressable>
            )}
        </View>

        {/* Chips de categoria */}
        <View style={estilos.chips}>
            {todasLasOpciones.map((cat) => (
            <Pressable
                key={cat}
                onPress={() => seleccionarCategoria(cat)}
                style={({ pressed }) => ({
                ...estilos.chip,
                backgroundColor:
                    catActiva === cat
                    ? "#2563eb"
                    : pressed
                    ? "#e5e7eb"
                    : "white",
                borderColor: catActiva === cat ? "#2563eb" : "#e5e7eb",
                })}
            >
                <Text
                style={{
                    ...estilos.chipTexto,
                    color: catActiva === cat ? "white" : "#374151",
                }}
                >
                {cat}
                </Text>
            </Pressable>
            ))}
        </View>

        {/* Resumen */}
        <View style={estilos.resumen}>
            <Text style={estilos.resumenTexto}>
            {resultados.length} resultado(s)
            </Text>
            {(texto.length > 0 || catActiva !== "todas") && (
            <Pressable onPress={limpiar}>
                <Text style={estilos.limpiarLink}>Limpiar filtros</Text>
            </Pressable>
            )}
        </View>

        {/* Lista de resultados */}
        <FlatList
            style={estilos.lista}
            contentContainerStyle={estilos.listaContenido}
            data={resultados}
            keyExtractor={(item: Plato) => String(item.id)}
            renderItem={({ item }) => (
            <Link
                href={{ pathname: "/menu/[id]", params: { id: item.id } }}
                asChild
            >
                <TarjetaPlato plato={item} />
            </Link>
            )}
            ListEmptyComponent={
            <View style={estilos.vacio}>
                <Ionicons name="sad-outline" size={48} color="#9ca3af" />
                <Text style={estilos.vacioTexto}>No se encontraron platos.</Text>
                <Text style={estilos.vacioAyuda}>
                Probá con otro texto o cambiá la categoría.
                </Text>
            </View>
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
    cajaBusqueda: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#111827",
        paddingVertical: 4,
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
    },
    chipTexto: {
        fontSize: 13,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    resumen: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    resumenTexto: {
        fontSize: 13,
        color: "#6b7280",
        fontStyle: "italic",
    },
    limpiarLink: {
        fontSize: 13,
        color: "#2563eb",
        fontWeight: "600",
    },
    lista: {
        flex: 1,
    },
    listaContenido: {
        padding: 16,
        paddingTop: 0,
    },
    vacio: {
        alignItems: "center",
        gap: 8,
        marginTop: 40,
    },
    vacioTexto: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6b7280",
    },
    vacioAyuda: {
        fontSize: 13,
        color: "#9ca3af",
        textAlign: "center",
    },
});