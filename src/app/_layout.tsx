import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProvider, useApp } from "../context/AppContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

function NavegacionRaiz() {
  const { usuario } = useApp();
  const conSesion = usuario !== null;

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="confirmar"
        options={{
          presentation: "modal",
          title: "Confirmar pedido",
        }}
      />

      <Stack.Screen
        name="turno/[numero]"
        options={{ title: "Tu turno" }}
      />

      <Stack.Screen name="buscar" options={{ title: "Buscar" }} />

      <Stack.Screen
        name="categorias/[categoria]"
        options={{ title: "Categoría" }}
      />

      <Stack.Screen name="ayuda" options={{ headerShown: false }} />

      <Stack.Screen name="pedido" options={{ headerShown: false }} />

      <Stack.Screen
        name="+not-found"
        options={{ title: "No encontrada" }}
      />

      <Stack.Protected guard={conSesion}>
        <Stack.Screen
          name="cocina"
          options={{ headerShown: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            title: "Login personal",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}