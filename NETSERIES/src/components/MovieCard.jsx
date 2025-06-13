import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function MovieCard({ title, posterPath, onPress }) {
  // Define a URL da imagem ou null se não houver posterPath
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;

  return (
    <Card style={styles.card} onPress={onPress}>
      {/* 1. Área da Imagem */}
      {imageUrl ? (
        // Se tiver imagem, mostra o Card.Cover
        <Card.Cover source={{ uri: imageUrl }} style={styles.cover} />
      ) : (
        // Se não tiver, mostra um espaço reservado (placeholder)
        <View style={styles.placeholderImage} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 10,
    backgroundColor: '#1F262E', // O fundo do card que aparece na área de conteúdo
  },
  cover: {
    height: 210, // Altura fixa para a imagem
    backgroundColor: '#2C3440', // Cor de fundo enquanto a imagem carrega
  },
  placeholderImage: {
    // Estilo do espaço reservado para filmes sem imagem
    height: 210,
    backgroundColor: '#2C3440',
    borderTopLeftRadius: 12, // Para combinar com o arredondamento do Card
    borderTopRightRadius: 12,
  },
  content: {
    // Estilização da área abaixo da imagem
    padding: 12,
    minHeight: 72, // Altura mínima para evitar que os cards fiquem desalinhados
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
  },
  title: {
    color: '#FFFFFF', // Cor do texto branca
    textAlign: 'center', // Alinhamento do texto centralizado
    lineHeight: 18, // Espaçamento entre linhas para títulos longos
  },
});