import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimeiroComponente from "./componentes/PrimeiroComponente";
import JavaScriptComponente from "./componentes/JavaScriptComponente";
import Perfil from "./componentes/Perfil";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <PrimeiroComponente />
      <JavaScriptComponente/>
      <Perfil nome="Vitin"
      idade={21}/>
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
