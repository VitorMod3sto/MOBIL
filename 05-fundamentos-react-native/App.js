import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './componentes/PrimeiroComponente';
import SegundoComponente from './componentes/SegundoComponente';
import TerceiroComponente from './componentes/TerceiroComponente';
import JavaScriptComponente from './componentes/JavaScriptComponente';
import Perfil from './componentes/Perfil';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <PrimeiroComponente/>
      <SegundoComponente/>
      <TerceiroComponente/>
      <JavaScriptComponente/>
      <Perfil
      nome="Vitin"
      idade={21}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
