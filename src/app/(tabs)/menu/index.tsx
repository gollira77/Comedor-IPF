import { View, Text, FlatList, StyleSheet, SectionList } from "react-native";
import { Link } from "expo-router";

import { CATEGORIAS, platosPorCategoria, type Plato } from "../../../data/platos";
import TarjetaPlato from "../../../components/TarjetaPlato";

export default function MenuIndex() {
  // Armamos las secciones del SectionList: una por categoría.
    const secciones = CATEGORIAS.map((cat) => ({
        titulo: cat,
        data: platosPorCategoria(cat),
    }));

    return (
        <SectionList
        style={estilos.lista}
        contentContainerStyle={estilos.contenido}
        sections={secciones}
        keyExtractor={(item: Plato) => String(item.id)}
        renderSectionHeader={({ section: { titulo } }) => (
            <View style={estilos.cabeceraSeccion}>
            <Text style={estilos.tituloSeccion}>{titulo.toUpperCase()}</Text>
            </View>
        )}
        renderItem={({ item }) => (
            <Link
            href={{ pathname: "/menu/[id]", params: { id: item.id } }}
            asChild
            >
            <TarjetaPlato plato={item} />
            </Link>
        )}
        ListEmptyComponent={
            <Text style={estilos.vacio}>No hay platos disponibles</Text>
        }
        stickySectionHeadersEnabled={false}
        />
    );
}

const estilos = StyleSheet.create({
    lista: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    contenido: {
        padding: 16,
    },
    cabeceraSeccion: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: "#f9fafb",
    },
    tituloSeccion: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#6b7280",
        letterSpacing: 0.8,
    },
    vacio: {
        textAlign: "center",
        color: "#9ca3af",
        marginTop: 40,
    },
});