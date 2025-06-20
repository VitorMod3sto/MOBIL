import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import GridMovieCard from '../components/GridMovieCard';

export default function FavoritosScreen({ navigation }) {
  const theme = useTheme();
  const { usuario, removerFavorito } = useAuth();
  const favoritos = usuario?.favoritos || [];

  const aoClicarNoCard = (item) => {
    const screen = item.media_type === 'movie' ? 'FilmeDetalhe' : 'SerieDetalhe';
    navigation.navigate(screen, { itemId: item.id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemDaGrelha}>
      <GridMovieCard
        posterPath={item.poster_path}
        onPress={() => aoClicarNoCard(item)}
      />
      <IconButton
        icon="close-circle"
        size={24}
        iconColor={theme.colors.error}
        style={styles.botaoRemover}
        onPress={() => removerFavorito(item.id)}
      />
    </View>
  );

  if (favoritos.length === 0) {
    return (
      <View style={[styles.container, styles.vazioContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineSmall" style={{ color: theme.colors.text }}>Sua lista está vazia</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>Adicione filmes e séries aos seus favoritos para vê-los aqui.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      data={favoritos}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.grelhaContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  grelhaContainer: { padding: 5 },
  itemDaGrelha: { flex: 1/3, margin: 5 },
  botaoRemover: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15
  },
  vazioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});