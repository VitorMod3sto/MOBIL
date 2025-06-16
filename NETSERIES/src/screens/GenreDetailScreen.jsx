import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { getMoviesByGenre } from '../connection/movieService';
import GridMovieCard from '../components/GridMovieCard'; // <-- 1. Importa o novo card
import CarrosselPersonalizado from '../components/CustomCarousel';
import { useCache } from '../contexts/CacheContext'; // 1. Importa o hook
import LoadingScreen from '../components/LoadingScreen'; // 1. Importa a tela


export default function GenreDetailScreen({ route, navigation }) {
  const genreId = route.params?.genreId;

  const [filmesDoGenero, setFilmesDoGenero] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { getCachedData } = useCache();

  useEffect(() => {
    if (genreId) {
      const buscarDados = async () => {
        setCarregando(true);
        // 3. Busca os filmes do género usando o cache
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

 // 2. MUDANÇA: Usa a nova tela de carregamento
   if (carregando) {
     return <LoadingScreen />;
   }

  const filmesEmDestaque = filmesDoGenero.slice(0, 5);

  return (
    <FlatList
      style={estilos.container}
      data={filmesDoGenero}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      // 2. Usamos contentContainerStyle para o espaçamento geral da grelha
      contentContainerStyle={estilos.grelhaContainer}
      ListHeaderComponent={
        <>
          <CarrosselPersonalizado
            dados={filmesEmDestaque}
            aoClicarNoItem={(item) => navigation.navigate("FilmeDetalhe", { itemId: item.id })}
          />
          <Text style={estilos.tituloDaSecao}>Todos os Filmes</Text>
        </>
      }
      renderItem={({ item }) => (
        // 3. Envolvemos o card numa View para aplicar o espaçamento
        <View style={estilos.itemDaGrelha}>
          <GridMovieCard
            title={item.title}
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
    backgroundColor: "#14181C",
  },
  carregador: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14181C",
  },
  tituloDaSecao: { 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    marginVertical: 16,
    fontSize: 20,
    paddingHorizontal: 14,
  },
  // 4. Novos estilos para a grelha funcionar corretamente
  grelhaContainer: {
    paddingHorizontal: 5,
  },
  itemDaGrelha: {
    flex: 1,
    padding: 5,
  }
});
