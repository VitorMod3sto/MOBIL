import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';

export default function ReceitaScreen({ navigation, route }) {
  const receita = route.params.item;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: receita.imagem }} style={styles.image} />
        <Card.Content>
          <Text style={styles.titulo}>{receita.nome}</Text>
          <Text style={styles.label}>⏱ Tempo de Preparo:</Text>
          <Text style={styles.texto}>{receita.tempoPreparo}</Text>

          <Text style={styles.label}>🍽 Porções:</Text>
          <Text style={styles.texto}>{receita.porcoes}</Text>

          <Text style={styles.label}>🧂 Ingredientes:</Text>
          <Text style={styles.texto}>{receita.ingredientes}</Text>

          <Text style={styles.label}>👨‍🍳 Modo de Preparo:</Text>
          <Text style={styles.texto}>{receita.modoPreparo}</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained-tonal"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Receitas
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    paddingBottom: 16,
  },
  image: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  texto: {
    fontSize: 15,
    marginTop: 4,
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 8,
  },
});
