import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import React from 'react';

const time = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
};

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>{time.nome}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: time.escudo }} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '90%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
