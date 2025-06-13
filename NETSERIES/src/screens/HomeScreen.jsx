import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { getPopularMovies, getPopularSeries, getTopRated, getNowPlayingMovies } from '../connection/movieService';
import MovieCard from '../components/MovieCard';
import CarrosselPersonalizado from '../components/CustomCarousel'; 

// A TelaDeInicio agora recebe 'navigation' como prop
export default function TelaDeInicio({ navigation }) {
  const [filmesEmDestaque, setFilmesEmDestaque] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [seriesPopulares, setSeriesPopulares] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      const [destaques, populares, series, alta] = await Promise.all([
        getNowPlayingMovies(),
        getPopularMovies(),
        getPopularSeries(),
        getTopRated()
      ]);
      
      setFilmesEmDestaque(destaques);
      setFilmesPopulares(populares);
      setSeriesPopulares(series);
      setEmAlta(alta);
      setCarregando(false);
    }
    buscarDados();
  }, []);

  const ClicarNoCard = (item) => {
    console.log('Clicou em:', item.title || item.name);
  };

  const renderizarSecao = (titulo, dados, tipoDeMidia = null) => (
    <View style={estilos.secao}>
      <Text style={estilos.tituloDaSecao} variant="headlineSmall">{titulo}</Text>
      <FlatList
        data={dados}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title || item.name}
            posterPath={item.poster_path}
            onPress={() => ClicarNoCard(item)}
          />
        )}
      />
    </View>
  );

  if (carregando) {
    return <ActivityIndicator style={estilos.carregador} size="large" />;
  }

  return (
    <ScrollView style={estilos.container}>
      <CarrosselPersonalizado dados={filmesEmDestaque} navigation={navigation} />

      <View style={estilos.conteudo}>
        {renderizarSecao('Filmes Populares', filmesPopulares, 'movie')}
        {renderizarSecao('Séries Populares', seriesPopulares, 'tv')}
        {renderizarSecao('Em Alta', emAlta)}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#14181C' },
  carregador: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14181C' },
  conteudo: { paddingHorizontal: 14, paddingBottom: 20 },
  secao: { marginTop: 24 },
  tituloDaSecao: { color: '#FFFFFF', fontWeight: 'bold', marginBottom: 16 },
});
