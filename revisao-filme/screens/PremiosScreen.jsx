import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

const premios = [
  {
    nome: "Oscar",
    categorias: ["Melhor Filme", "Melhor Diretor", "Melhor Roteiro Adaptado"]
  },
  {
    nome: "Globo de Ouro",
    categorias: ["Melhor Filme de Drama", "Melhor Diretor"]
  },
  {
    nome: "BAFTA",
    categorias: ["Melhor Filme", "Melhor Direção de Arte"]
  },
];

export default function PremiosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={premios}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.nomePremio}>{item.nome}</Text>
            {item.categorias.map((categoria, index) => (
              <Text key={index} style={styles.categoria}>• {categoria}</Text>
            ))}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  nomePremio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  categoria: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 4,
  },
});
