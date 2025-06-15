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

export default function TelaDeInicio({ navigation }) {
  const [filmesEmDestaque, setFilmesEmDestaque] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [seriesPopulares, setSeriesPopulares] = useState([]);
  const [seriesNoAr, setSeriesNoAr] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      const [destaques, populares, sPopulares, alta, noAr] = await Promise.all([
        getNowPlayingMovies(),
        getPopularMovies(),
        getPopularSeries(),
        getTopRated(),
        getOnTheAirSeries(),
      ]);

      setFilmesEmDestaque(destaques);
      setFilmesPopulares(populares);
      setSeriesPopulares(sPopulares);
      setSeriesNoAr(noAr);
      setEmAlta(alta);
      setCarregando(false);
    }
    buscarDados();
  }, []);

  const aoClicarNoCard = (item, tipoDeMidia = null) => {
    const tipo = tipoDeMidia || item.media_type;
    if (tipo === "movie") {
      navigation.navigate("FilmeDetalhe", { itemId: item.id });
    } else if (tipo === "tv") {
      navigation.navigate("SerieDetalhe", { itemId: item.id });
    }
  };

  // MUDANÇA: Adicionamos o parâmetro 'alinhamento'
  const renderizarSecao = (titulo, dados, tipoDeMidia = null, alinhamento = 'left') => (
    <View style={estilos.secao}>
      {/* O título agora usa um alinhamento dinâmico */}
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

  if (carregando) {
    return <ActivityIndicator style={estilos.carregador} size="large" />;
  }

  return (
    <ScrollView style={estilos.container}>
      {/* Carrossel de Filmes em Destaque (ocupa a tela toda) */}
      <CarrosselPersonalizado
        dados={filmesEmDestaque}
        aoClicarNoItem={(item) => navigation.navigate("FilmeDetalhe", { itemId: item.id })}
      />

{renderizarSecao("Filmes Populares", filmesPopulares, "movie")}

      {/* MUDANÇA: Seção do Carrossel de Séries, agora fora do 'conteudo' */}
      <View style={estilos.secaoDeCarrossel}>
        <Text style={[estilos.tituloDaSecao, { paddingHorizontal: 14, textAlign: 'right' }]}>
          Séries Novas no Ar
        </Text>
        <CarrosselPersonalizado
          dados={seriesNoAr}
          aoClicarNoItem={(item) => navigation.navigate("SerieDetalhe", { itemId: item.id })}
        />
      </View>
      
      {/* View 'conteudo' agora tem apenas as listas com espaçamento */}
      <View style={estilos.conteudo}>
        
        {renderizarSecao("Séries Populares", seriesPopulares, "tv")}
        {/* MUDANÇA: Passamos o alinhamento 'right' para a seção "Em Alta" */}
        {renderizarSecao("Em Alta", emAlta, null, 'right')}
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
    // Adicionamos o padding aqui para os títulos dentro do 'conteudo'
    paddingHorizontal: 14
  },
});
