import { View, Text } from "react-native";

import { useApp } from "../../context/AppContext";

export default function Inicio() {
  const { carrito, cantidadEnEspera, usuario } = useApp();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Comedor IPF
      </Text>

      <Text>Ítems en carrito: {carrito.length}</Text>
      <Text>Pedidos en espera: {cantidadEnEspera}</Text>
      <Text>Usuario: {usuario ?? "sin sesión"}</Text>
    </View>
  );
}