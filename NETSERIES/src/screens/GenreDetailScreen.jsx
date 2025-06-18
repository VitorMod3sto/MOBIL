import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { getMoviesByGenre } from '../connection/movieService';
import GridMovieCard from '../components/GridMovieCard'; 
import CarrosselPersonalizado from '../components/CustomCarousel';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function GenreDetailScreen({ route, navigation }) {
  const genreId = route.params?.genreId;
  const { getCachedData } = useCache();
  const theme = useTheme(); 

  const [filmesDoGenero, setFilmesDoGenero] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (genreId) {
      const buscarDados = async () => {
        setCarregando(true);
        const resultados = await getCachedData(`genre-${genreId}`, () => getMoviesByGenre(genreId));
        setFilmesDoGenero(resultados);
        setCarregando(false);
      };
      buscarDados();
    } else {
      setCarregando(false);
    }
  }, [genreId, getCachedData]);

  const aoClicarNoCard = (item) => {
    navigation.navigate("FilmeDetalhe", { itemId: item.id });
  };

  if (carregando) {
    return <LoadingScreen />;
  }

  const filmesEmDestaque = filmesDoGenero.slice(0, 5);

  return (
    <FlatList
      style={[estilos.container, { backgroundColor: theme.colors.background }]}
      data={filmesDoGenero}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={estilos.grelhaContainer}
      ListHeaderComponent={
        <View style={estilos.headerContainer}>
          <CarrosselPersonalizado
            dados={filmesEmDestaque}
            aoClicarNoItem={(item) => navigation.navigate("FilmeDetalhe", { itemId: item.id })}
          />
          <Text style={[estilos.tituloDaSecao, { color: theme.colors.text }]}>Todos os Filmes</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={estilos.itemDaGrelha}>
          <GridMovieCard
            posterPath={item.poster_path}
            onPress={() => aoClicarNoCard(item)}
          />
        </View>
      )}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  grelhaContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerContainer: {
    marginHorizontal: -10, // Anula o padding para o carrossel ocupar a tela toda
    marginBottom: 10,
  },
  tituloDaSecao: { 
    fontWeight: "bold", 
    marginVertical: 16,
    fontSize: 20,
    paddingHorizontal: 14,
  },
  itemDaGrelha: {
    flex: 1,
    padding: 5,
  }
});
