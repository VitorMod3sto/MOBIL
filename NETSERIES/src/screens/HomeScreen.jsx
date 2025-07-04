import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
} from "react-native";
// 1. Importamos o useTheme do react-native-paper
import { Text, useTheme } from "react-native-paper";
import {
  getPopularMovies,
  getPopularSeries,
  getTopRated,
  getNowPlayingMovies,
  getOnTheAirSeries,
} from "../connection/movieService";
import MovieCard from "../components/MovieCard";
import CarrosselPersonalizado from "../components/CustomCarousel";
import DestaquePrincipal from "../components/DestaquePrincipal";
import { useCache } from "../contexts/CacheContext";
import LoadingScreen from '../components/LoadingScreen';

export default function TelaDeInicio({ navigation }) {
  const [filmesEmDestaque, setFilmesEmDestaque] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [seriesPopulares, setSeriesPopulares] = useState([]);
  const [seriesNoAr, setSeriesNoAr] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const { getCachedData } = useCache();
  const theme = useTheme(); // 2. Pega o objeto do tema atual
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      setCarregando(true);
      const [destaques, populares, sPopulares, alta, noAr] = await Promise.all([
        getCachedData('nowPlayingMovies', getNowPlayingMovies),
        getCachedData('popularMovies', getPopularMovies),
        getCachedData('popularSeries', getPopularSeries),
        getCachedData('topRated', getTopRated),
        getCachedData('onTheAirSeries', getOnTheAirSeries),
      ]);

      setFilmesEmDestaque(destaques);
      setFilmesPopulares(populares);
      setSeriesPopulares(sPopulares);
      setSeriesNoAr(noAr);
      setEmAlta(alta);
      setCarregando(false);
    }
    buscarDados();
  }, [getCachedData]);

  const aoClicarNoCard = (item, tipoDeMidia = null) => {
    const tipo = tipoDeMidia || item.media_type;
    if (tipo === "movie") {
      navigation.navigate("FilmeDetalhe", { itemId: item.id });
    } else if (tipo === "tv") {
      navigation.navigate("SerieDetalhe", { itemId: item.id });
    }
  };

  const renderizarSecao = (titulo, dados, tipoDeMidia = null, alinhamento = 'left') => (
    <View style={estilos.secao}>
      {/* O título da seção agora pega a cor do tema */}
      <Text style={[estilos.tituloDaSecao, { textAlign: alinhamento, color: theme.colors.text }]}>
        {titulo}
      </Text>
      <FlatList
        data={dados}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title || item.name}
            posterPath={item.poster_path}
            onPress={() => aoClicarNoCard(item, tipoDeMidia)}
          />
        )}
      />
    </View>
  );

  if (carregando) {
    return <LoadingScreen />;
  }

  return (
    // 3. A cor de fundo da ScrollView agora vem do tema
    <ScrollView style={[estilos.container, { backgroundColor: theme.colors.background }]}>
      <DestaquePrincipal dados={filmesEmDestaque} navigation={navigation} />

      <View style={estilos.secaoDeCarrossel}>
        <Text style={[estilos.tituloDaSecao, { paddingHorizontal: 14, textAlign: 'right', color: theme.colors.text }]}>
          Séries Novas no Ar
        </Text>
        <CarrosselPersonalizado
          dados={seriesNoAr}
          aoClicarNoItem={(item) => navigation.navigate("SerieDetalhe", { itemId: item.id })}
        />
      </View>
      
      <View style={estilos.conteudo}>
        {renderizarSecao("Filmes Populares", filmesPopulares, "movie")}
        {renderizarSecao("Séries Populares", seriesPopulares, "tv", 'right')}
        {renderizarSecao("Em Alta", emAlta, null, 'left')}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1,
    // Cor de fundo removida daqui
  },
  conteudo: { paddingHorizontal: 14, paddingBottom: 20 },
  secaoDeCarrossel: { 
    marginTop: 24 
  },
  secao: { 
    marginTop: 24 
  },
  tituloDaSecao: { 
    // Cor removida daqui
    fontWeight: "bold", 
    marginBottom: 16,
    fontSize: 20,
    paddingHorizontal: 14
  },
});
