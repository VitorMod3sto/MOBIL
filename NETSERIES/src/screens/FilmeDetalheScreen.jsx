import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, Button, ActivityIndicator, Chip } from 'react-native-paper';
import { getMovieDetails, getMovieRecommendations } from '../connection/movieService';
import MovieCard from '../components/MovieCard';

export default function FilmeDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;

  const [detalhes, setDetalhes] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      setCarregando(true);
      const [dadosDosDetalhes, dadosDasRecomendacoes] = await Promise.all([
        getMovieDetails(itemId),
        getMovieRecommendations(itemId)
      ]);
      setDetalhes(dadosDosDetalhes);
      setRecomendacoes(dadosDasRecomendacoes);
      setCarregando(false);
    };
    buscarDetalhes();
  }, [itemId]);

  if (carregando) {
    return <ActivityIndicator style={estilos.carregador} size="large" />;
  }

  if (!detalhes) {
    return <Text style={estilos.textoDeErro}>Não foi possível carregar os detalhes.</Text>;
  }

  const formatarDuracao = (duracao) => {
    if (!duracao) return '';
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    return `${horas}h ${minutos}m`;
  };

  return (
    <ScrollView style={estilos.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={estilos.titulo}>{detalhes.title}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={estilos.textoDeMetadados}>{new Date(detalhes.release_date).getFullYear()}</Text>
          <Text style={estilos.textoDeMetadados}>{formatarDuracao(detalhes.runtime)}</Text>
          <Chip style={estilos.etiqueta} textStyle={{color: '#fff'}}>14+</Chip>
        </View>
        <Text style={estilos.descricao}>{detalhes.overview}</Text>
        <Button mode="contained" onPress={() => console.log('Assistir')} icon="play" style={estilos.botaoAssistir} labelStyle={estilos.textoDoBotaoAssistir}>
          Assistir
        </Button>
      </View>
      <View style={estilos.secaoDeRelacionados}>
        <Text variant="headlineSmall" style={estilos.tituloDeRelacionados}>Relacionados</Text>
        <FlatList
          data={recomendacoes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard title={item.title} posterPath={item.poster_path} onPress={() => navigation.push('FilmeDetalhe', { itemId: item.id })} />
          )}
          contentContainerStyle={{ paddingLeft: 14 }}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#14181C' },
    carregador: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14181C' },
    textoDeErro: { color: 'white', textAlign: 'center', marginTop: 50 },
    banner: { width: '100%', height: 220 },
    conteudo: { padding: 14 },
    titulo: { color: 'white', fontWeight: 'bold' },
    containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    textoDeMetadados: { color: '#a0a0a0', marginRight: 15 },
    etiqueta: { backgroundColor: '#333', marginRight: 15 },
    descricao: { color: '#d0d0d0', fontSize: 15, lineHeight: 22, marginVertical: 10 },
    botaoAssistir: { backgroundColor: '#E50914', borderRadius: 5, marginVertical: 15, paddingVertical: 4 },
    textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
    secaoDeRelacionados: { marginTop: 10, marginBottom: 30 },
    tituloDeRelacionados: { color: 'white', marginLeft: 14, marginBottom: 16 },
});
