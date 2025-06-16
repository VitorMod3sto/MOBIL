import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { getSeriesByGenre, getSeriesGenres } from '../connection/movieService';
import MovieCard from '../components/MovieCard';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function SeriesScreen({ navigation }) {
  const [listaDeGeneros, setListaDeGeneros] = useState([]);
  const [seriesPorGenero, setSeriesPorGenero] = useState({});
  const [carregando, setCarregando] = useState(true);
  const { getCachedData } = useCache();

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      
      const generosDaAPI = await getCachedData('seriesGenres', getSeriesGenres);
      
      if (generosDaAPI && generosDaAPI.length > 0) {
        setListaDeGeneros(generosDaAPI);

        const promises = generosDaAPI.map(genero => 
          getCachedData(`series-genre-${genero.id}`, () => getSeriesByGenre(genero.id))
        );
        const resultados = await Promise.all(promises);
        
        const seriesOrganizadas = {};
        generosDaAPI.forEach((genero, index) => {
          seriesOrganizadas[genero.name] = resultados[index];
        });
        
        setSeriesPorGenero(seriesOrganizadas);
      }
      
      setCarregando(false);
    };
    buscarDados();
  }, [getCachedData]);

  const aoClicarNoCard = (item) => {
    navigation.navigate("SerieDetalhe", { itemId: item.id });
  };

  const renderizarSecao = (genero) => (
    <View style={estilos.secao}>
      <View style={estilos.cabecalhoDaSecao}>
        <Text style={estilos.tituloDaSecao}>{genero.name}</Text>
        <IconButton
          icon="arrow-right"
          iconColor="#fff"
          size={20}
          // MUDANÇA: O botão agora navega para a tela de detalhes do gênero
          onPress={() => {
            navigation.navigate('SeriesGenreDetail', { 
              genreId: genero.id, 
              genreName: genero.name 
            });
          }}
        />
      </View>
      <FlatList
        data={seriesPorGenero[genero.name]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.name} // Séries usam 'name'
            posterPath={item.poster_path}
            onPress={() => aoClicarNoCard(item)}
          />
        )}
        contentContainerStyle={{ paddingLeft: 14 }}
      />
    </View>
  );

  if (carregando) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      style={estilos.container}
      data={listaDeGeneros}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderizarSecao(item)}
      ListHeaderComponent={<View style={{ height: 10 }} />}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#14181C" 
  },
  secao: { 
    marginBottom: 14 
  },
  cabecalhoDaSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  tituloDaSecao: { 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    fontSize: 20,
  },
});
