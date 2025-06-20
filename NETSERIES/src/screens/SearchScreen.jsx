import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { TextInput, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { searchMulti } from '../connection/movieService';
import debounce from 'lodash.debounce'; // para evitar requisições a toda tecla

export default function SearchScreen({ navigation }) {
  const theme = useTheme();

  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Função para buscar dados com debounce (300ms)
  const buscarResultados = useCallback(
    debounce(async (texto) => {
      if (!texto) {
        setResultados([]);
        setCarregando(false);
        return;
      }

      setCarregando(true);
      const resultadosBusca = await searchMulti(texto);
      setResultados(resultadosBusca);
      setCarregando(false);
    }, 300),
    []
  );

  useEffect(() => {
    buscarResultados(query);
  }, [query]);

  const aoClicarNoItem = (item) => {
    if (item.media_type === 'movie') {
      navigation.navigate('FilmeDetalhe', { itemId: item.id });
    } else if (item.media_type === 'tv') {
      navigation.navigate('SerieDetalhe', { itemId: item.id });
    } else {
      // outros tipos ignorar
    }
  };

  const renderItem = ({ item }) => {
    if (!item.poster_path) return null; // opcional: só mostrar com imagem
    return (
      <TouchableOpacity onPress={() => aoClicarNoItem(item)} style={styles.itemContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w92${item.poster_path}` }}
          style={styles.imagem}
          resizeMode="cover"
        />
        <Text style={[styles.titulo, { color: theme.colors.text }]} numberOfLines={1}>
          {item.title || item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        mode="outlined"
        placeholder="Buscar filmes e séries..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoFocus
      />

      {carregando ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  input: { marginBottom: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagem: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    flexShrink: 1,
  },
});
