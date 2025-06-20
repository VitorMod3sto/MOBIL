// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    const sucesso = await login(email.trim().toLowerCase(), senha);
    if (!sucesso) {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Logo estilizada */}
        <Text style={[styles.logoTexto, { color: theme.colors.primary }]}>
          NETseries
        </Text>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TextInput
          label="E-mail"
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleLogin} style={styles.botao}>
          Entrar
        </Button>

        <Button
          onPress={() => navigation.navigate("Register")}
          style={styles.link}
        >
          Não tem conta? Cadastre-se
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoTexto: {
    fontSize: 48,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
  },
  botao: {
    marginTop: 8,
  },
  link: {
    marginTop: 16,
    alignSelf: "center",
  },
});
