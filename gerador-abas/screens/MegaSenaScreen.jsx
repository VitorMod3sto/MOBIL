import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Card, Text, Button } from "react-native-paper";

export default function MegaSenaScreen() {
  const [jogo, setJogo] = useState([]);
  const [lista, setLista] = useState([]);

  function gerar() {
    const numeros = [];

    while (numeros.length < 6) {
      const n = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(n)) {
        numeros.push(n);
      }
    }

    const novoJogo = numeros.sort((a, b) => a - b);
    setJogo(novoJogo);
    setLista([novoJogo, ...lista]);
  }

  function resetar() {
    setJogo([]);
    setLista([]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            🎰 Jogo da Mega-Sena
          </Text>
          <Text style={styles.numeros}>
            {jogo.length > 0 ? jogo.join(" - ") : "Nenhum número gerado ainda"}
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            buttonColor="#388e3c"
            textColor="#fff"
            onPress={gerar}
            style={styles.botao}
          >
            Gerar
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subtitle}>
            🕒 Histórico de Jogos
          </Text>
          {lista.length === 0 ? (
            <Text style={styles.semHistorico}>Nenhum jogo salvo.</Text>
          ) : (
            lista.map((item, index) => (
              <Text key={index} style={styles.historicoItem}>
                {item.join(" - ")}
              </Text>
            ))
          )}
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            textColor="#d32f2f"
            onPress={resetar}
            style={styles.botao}
          >
            Resetar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 12,
  },
  numeros: {
    textAlign: "center",
    fontSize: 22,
    color: "#2e7d32",
    marginTop: 8,
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  historicoItem: {
    backgroundColor: "#e8f5e9",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    fontSize: 16,
    color: "#333",
  },
  semHistorico: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
  actions: {
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 10,
  },
  botao: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
