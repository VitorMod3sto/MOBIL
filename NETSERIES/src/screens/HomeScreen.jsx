import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import {
  getPopularMovies,
  getPopularSeries,
  getTopRated,
  getNowPlayingMovies,
  getOnTheAirSeries,
} from "../connection/movieService";
import MovieCard from "../components/MovieCard";
import CarrosselPersonalizado from "../components/CustomCarousel";
import DestaquePrincipal from "../components/DestaquePrincipal"; // 1. Importa o novo componente
import { useCache } from "../contexts/CacheContext";
import LoadingScreen from "../components/LoadingScreen"; // 1. Importa a nova tela


export default function TelaDeInicio({ navigation }) {
  const [filmesEmDestaque, setFilmesEmDestaque] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [seriesPopulares, setSeriesPopulares] = useState([]);
  const [seriesNoAr, setSeriesNoAr] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const { getCachedData } = useCache();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
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
    };
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
      <Text style={[estilos.tituloDaSecao, { textAlign: alinhamento }]}>{titulo}</Text>
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

  // 2. MUDANÇA: Se estiver a carregar, exibe a nossa nova tela
  if (carregando) {
    return <LoadingScreen />;
  }


  return (
    <ScrollView style={estilos.container}>
      {/* 2. Substituímos o carrossel antigo pelo novo componente de destaque */}
      <DestaquePrincipal dados={filmesEmDestaque} navigation={navigation} />

      {/* Seção do carrossel de séries */}
      <View style={estilos.secaoDeCarrossel}>
        <Text style={[estilos.tituloDaSecao, { paddingHorizontal: 14, textAlign: 'right' }]}>
          Séries Novas no Ar
        </Text>
        <CarrosselPersonalizado
          dados={seriesNoAr}
          aoClicarNoItem={(item) => navigation.navigate("SerieDetalhe", { itemId: item.id })}
        />
      </View>
      
      {/* Seções com listas de cards */}
      <View style={estilos.conteudo}>
        {renderizarSecao("Filmes Populares", filmesPopulares, "movie")}
{renderizarSecao("Séries Populares", seriesPopulares, "tv", 'right')}
        {renderizarSecao("Em Alta", emAlta, null)}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#14181C" },
  carregador: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14181C",
  },
  conteudo: { paddingHorizontal: 14, paddingBottom: 20 },
  secaoDeCarrossel: { 
    marginTop: 24 
  },
  secao: { 
    marginTop: 24 
  },
  tituloDaSecao: { 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    marginBottom: 16,
    fontSize: 20,
    paddingHorizontal: 14
  },
});
