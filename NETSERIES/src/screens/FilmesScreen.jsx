import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { getMoviesByGenre, getMovieGenres } from '../connection/movieService';
import MovieCard from '../components/MovieCard';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen'; // 1. Importa a tela


export default function FilmesScreen({ navigation }) {
  const [listaDeGeneros, setListaDeGeneros] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState({});
  const [carregando, setCarregando] = useState(true);
  const { getCachedData } = useCache();

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      
      const generosDaAPI = await getCachedData('movieGenres', getMovieGenres);
      
      if (generosDaAPI && generosDaAPI.length > 0) {
        setListaDeGeneros(generosDaAPI);

        const promises = generosDaAPI.map(genero => 
          getCachedData(`genre-${genero.id}`, () => getMoviesByGenre(genero.id))
        );
        const resultados = await Promise.all(promises);
        
        const filmesOrganizados = {};
        generosDaAPI.forEach((genero, index) => {
          filmesOrganizados[genero.name] = resultados[index];
        });
        
        setFilmesPorGenero(filmesOrganizados);
      }
      
      setCarregando(false);
    };
    buscarDados();
  }, [getCachedData]);

  const aoClicarNoCard = (item) => {
    navigation.navigate("FilmeDetalhe", { itemId: item.id });
  };

  const renderizarSecao = (genero) => (
    <View style={estilos.secao}>
      <View style={estilos.cabecalhoDaSecao}>
        <Text style={estilos.tituloDaSecao}>{genero.name}</Text>
        <IconButton
          icon="arrow-right"
          iconColor="#fff"
          size={20}
          onPress={() => navigation.navigate('GenreDetail', { 
            genreId: genero.id, 
            genreName: genero.name 
          })}
        />
      </View>
      <FlatList
        data={filmesPorGenero[genero.name]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            posterPath={item.poster_path}
            onPress={() => aoClicarNoCard(item)}
          />
        )}
        contentContainerStyle={{ paddingLeft: 14 }}
      />
    </View>
  );

  // 2. MUDANÇA: Usa a nova tela de carregamento
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
  carregador: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14181C",
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
