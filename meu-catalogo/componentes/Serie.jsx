import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Serie(props) {
  const { nome, ano, diretor, temporadas, capa } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: capa }} style={styles.imagem} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.detalhes}>Ano: {ano}</Text>
      <Text style={styles.detalhes}>Diretor: {diretor}</Text>
      <Text style={styles.detalhes}>Temporadas: {temporadas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    margin: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detalhes: {
    color: '#ccc',
    fontSize: 14,
  },
  imagem: {
    height: 300,
    width: 200,
    borderRadius: 10,
  }
});
