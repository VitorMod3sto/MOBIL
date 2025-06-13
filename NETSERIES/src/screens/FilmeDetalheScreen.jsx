import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Esta tela recebe a prop 'route' para acessar os parâmetros
export default function FilmeDetalheScreen({ route }) {
  // Pega o nome do filme que foi passado como parâmetro
  const { item } = route.params;

  const nomeDoFilme = item.name || item.title;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Filme</Text>
      <Text style={styles.name}>{nomeDoFilme}</Text>
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
