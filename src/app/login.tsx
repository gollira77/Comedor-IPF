import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useApp } from "../context/AppContext";

// Credenciales fijas (como pide el enunciado G1: "usuario y clave fijos en el código")
const USUARIO_FIJO = "cocina";
const CLAVE_FIJA = "1234";

export default function Login() {
  const { iniciarSesion } = useApp();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState("");

  const entrar = () => {
    setError("");

    if (!usuario.trim() || !clave.trim()) {
      setError("Completá usuario y contraseña.");
      return;
    }

    if (usuario !== USUARIO_FIJO || clave !== CLAVE_FIJA) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }

    // Correcto: guardamos la sesión en el context.
    // Al cambiar `usuario` a no-null, el guard !conSesion de Stack.Protected
    // se vuelve false y el modal se cierra automaticamente.
    iniciarSesion(usuario);
  };

  const cancelar = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Login personal" }} />

      <View style={estilos.cabecera}>
        <Ionicons name="flame" size={48} color="#dc2626" />
        <Text style={estilos.titulo}>Acceso cocina</Text>
        <Text style={estilos.subtitulo}>
          Solo para personal del comedor.
        </Text>
      </View>

      <View style={estilos.formulario}>
        {/* Usuario */}
        <View style={estilos.campo}>
          <Text style={estilos.label}>Usuario</Text>
          <View style={estilos.inputCaja}>
            <Ionicons name="person-outline" size={18} color="#6b7280" />
            <TextInput
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Ingresá tu usuario"
              autoCapitalize="none"
              autoCorrect={false}
              style={estilos.input}
            />
          </View>
        </View>

        {/* Clave */}
        <View style={estilos.campo}>
          <Text style={estilos.label}>Contraseña</Text>
          <View style={estilos.inputCaja}>
            <Ionicons name="lock-closed-outline" size={18} color="#6b7280" />
            <TextInput
              value={clave}
              onChangeText={setClave}
              placeholder="Ingresá tu contraseña"
              secureTextEntry={!verClave}
              autoCapitalize="none"
              autoCorrect={false}
              style={estilos.input}
            />
            <Pressable onPress={() => setVerClave((v) => !v)}>
              <Ionicons
                name={verClave ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6b7280"
              />
            </Pressable>
          </View>
        </View>

        {/* Error */}
        {error.length > 0 && (
          <View style={estilos.errorCaja}>
            <Ionicons name="alert-circle" size={18} color="#dc2626" />
            <Text style={estilos.errorTexto}>{error}</Text>
          </View>
        )}

        {/* Pista de credenciales (para el TP) */}
        <View style={estilos.pistaCaja}>
          <Ionicons name="information-circle-outline" size={16} color="#2563eb" />
          <Text style={estilos.pistaTexto}>
            Usuario: <Text style={estilos.pistaFuerte}>cocina</Text> · Clave:{" "}
            <Text style={estilos.pistaFuerte}>1234</Text>
          </Text>
        </View>

        {/* Botones */}
        <View style={estilos.botones}>
          <Pressable
            onPress={cancelar}
            style={({ pressed }) => ({
              ...estilos.botonSecundario,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={estilos.botonSecundarioTexto}>Cancelar</Text>
          </Pressable>

          <Pressable
            onPress={entrar}
            style={({ pressed }) => ({
              ...estilos.botonPrimario,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Ionicons name="log-in-outline" size={20} color="white" />
            <Text style={estilos.botonPrimarioTexto}>Entrar</Text>
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
    padding: 24,
  },
  cabecera: {
    alignItems: "center",
    gap: 4,
    marginTop: 16,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  formulario: {
    gap: 16,
  },
  campo: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  inputCaja: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  errorCaja: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
  },
  errorTexto: {
    fontSize: 13,
    color: "#dc2626",
    flex: 1,
  },
  pistaCaja: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
  },
  pistaTexto: {
    fontSize: 12,
    color: "#1e40af",
  },
  pistaFuerte: {
    fontWeight: "bold",
  },
  botones: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  botonSecundario: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  botonSecundarioTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  botonPrimario: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 10,
  },
  botonPrimarioTexto: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});