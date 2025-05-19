import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React from "react";
import NomeNumero from "./components/NomeNumero";
import Controle from "./components/Controle";
import Pessoa from "./components/Pessoa";
import GeradorNumeroAleatorio from "./components/GeradorNumeroAleatorio";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Pessoa />
      <GeradorNumeroAleatorio />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
