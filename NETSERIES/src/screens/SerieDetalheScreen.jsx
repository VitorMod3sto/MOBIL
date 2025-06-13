import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Certifique-se de que a função tem um 'export default'
export default function SerieDetalheScreen({ route }) {
  // Pega o objeto completo da série que foi passado via parâmetros
  const { item } = route.params;

  // Extrai o nome do objeto para exibição
  const nomeDaSerie = item.name || item.title;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Série</Text>
      <Text style={styles.name}>{nomeDaSerie}</Text>
      {/* Futuramente, podemos usar outras propriedades de 'item' aqui, como item.overview */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14181C',
  },
  title: {
    color: '#a0a0a0',
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
