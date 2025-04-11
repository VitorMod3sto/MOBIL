import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import React from 'react';

const time = {
  nome: "Clube de Regatas do Flamengo",
  escudo: "https://i.pinimg.com/736x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg", // imagem em maior resolução
};

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{time.nome}</Text>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: time.escudo }} style={styles.escudo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E11B22',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    borderWidth: 4,
    borderColor: '#E11B22',
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#1C1C1C',
    elevation: 10,
    shadowColor: '#E11B22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  escudo: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
});
