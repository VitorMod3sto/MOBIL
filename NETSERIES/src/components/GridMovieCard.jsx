import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

// MUDANÇA: O componente não precisa mais da prop 'title'
export default function GridMovieCard({ posterPath, onPress }) {
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;

  return (
    <Card style={estilos.card} onPress={onPress}>
      {imageUrl ? (
        <Card.Cover source={{ uri: imageUrl }} style={estilos.cover} />
      ) : (
        <View style={estilos.placeholderImage} />
      )}
      {/* A seção <Card.Content> com o título foi removida */}
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#1F262E',
    // MUDANÇA: Removemos a elevação para um visual mais plano
    elevation: 0, 
  },
  cover: {
    height: 165,
    backgroundColor: '#2C3440',
  },
  placeholderImage: {
    height: 165,
    backgroundColor: '#2C3440',
    borderRadius: 12,
  },
  // Os estilos para 'content' e 'title' não são mais necessários
});
