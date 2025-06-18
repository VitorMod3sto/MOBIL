import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
// 1. Importa o hook 'useTheme'
import { Text, useTheme } from 'react-native-paper';
import { getSeriesByGenre } from '../connection/movieService';
import GridMovieCard from '../components/GridMovieCard';
import CarrosselPersonalizado from '../components/CustomCarousel';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function SeriesGenreDetailScreen({ route, navigation }) {
  const genreId = route.params?.genreId;
  const { getCachedData } = useCache();
  const theme = useTheme(); // 2. Pega o objeto do tema atual

  const [seriesDoGenero, setSeriesDoGenero] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (genreId) {
      const buscarDados = async () => {
        setCarregando(true);
        const resultados = await getCachedData(`series-genre-${genreId}`, () => getSeriesByGenre(genreId));
        setSeriesDoGenero(resultados);
        setCarregando(false);
      };
      buscarDados();
    } else {
      setCarregando(false);
    }
  }, [genreId, getCachedData]);

  const aoClicarNoCard = (item) => {
    navigation.navigate("SerieDetalhe", { itemId: item.id });
  };

  if (carregando) {
    return <LoadingScreen />;
  }

  // Pegamos as 5 primeiras para o carrossel de destaque
  const seriesEmDestaque = seriesDoGenero.slice(0, 5);

  return (
    <FlatList
      // 3. Aplica a cor de fundo do tema
      style={[estilos.container, { backgroundColor: theme.colors.background }]}
      data={seriesDoGenero}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={estilos.grelhaContainer}
      ListHeaderComponent={
        <View style={estilos.headerContainer}>
            <CarrosselPersonalizado
                dados={seriesEmDestaque}
                aoClicarNoItem={(item) => navigation.navigate("SerieDetalhe", { itemId: item.id })}
            />
            {/* 4. O título da seção agora pega a cor do tema */}
            <Text style={[estilos.tituloDaSecao, { color: theme.colors.text }]}>Todas as Séries</Text>
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
    marginHorizontal: -10,
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
