import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Alert } from 'react-native';
import { Text, Button, ActivityIndicator, Chip } from 'react-native-paper';
import YoutubeIframe from 'react-native-youtube-iframe';
// 1. Importa a nova função de serviço
import { getMovieDetails, getMovieRecommendations, getMovieVideos, getMovieCertifications } from '../connection/movieService';
import MovieCard from '../components/MovieCard';

export default function FilmeDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;

  const [detalhes, setDetalhes] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [chaveDoTrailer, setChaveDoTrailer] = useState(null);
  const [reproduzindo, setReproduzindo] = useState(false);
  const [classificacao, setClassificacao] = useState('L');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      const [
        dadosDosDetalhes,
        dadosDasRecomendacoes,
        chaveDoVideo,
        dadosDaClassificacao
      ] = await Promise.all([
        getMovieDetails(itemId),
        getMovieRecommendations(itemId),
        getMovieVideos(itemId),
        getMovieCertifications(itemId)
      ]);

      setDetalhes(dadosDosDetalhes);
      setRecomendacoes(dadosDasRecomendacoes);
      setChaveDoTrailer(chaveDoVideo);
      setClassificacao(dadosDaClassificacao);
      setCarregando(false);
    };
    buscarDados();
  }, [itemId]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setReproduzindo(false);
    }
  }, []);

  const handlePlay = () => {
    if (chaveDoTrailer) {
      setReproduzindo(true);
    } else {
      Alert.alert("Trailer não disponível", "Não foi possível encontrar um trailer para este filme.");
    }
  };

  // MUDANÇA: Função auxiliar para estilizar a classificação
  const getEstiloDaClassificacao = (rating) => {
    // Padrão para 'L' (Livre) ou valores não numéricos
    let corDeFundo = '#28a745'; // Verde
    let texto = rating || 'L';

    if (rating && !isNaN(rating)) {
      const idade = parseInt(rating);
      texto = `${idade}+`; // Adiciona o '+'
      if (idade >= 18) {
        corDeFundo = '#dc3545'; // Vermelho
      } else if (idade >= 14) {
        corDeFundo = '#0d6efd'; // Azul
      }
    }
    return { corDeFundo, texto };
  };

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

  // Pega o estilo e o texto formatado para a classificação
  const { corDeFundo, texto } = getEstiloDaClassificacao(classificacao);

  return (
    <ScrollView style={estilos.container}>
      {/* Área do Player/Banner */}
      <View style={estilos.areaDoPlayer}>
        {reproduzindo && chaveDoTrailer ? (
          <YoutubeIframe
            height={220}
            play={true}
            videoId={chaveDoTrailer}
            onChangeState={onStateChange}
          />
        ) : (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }}
            style={estilos.banner}
          />
        )}
      </View>

      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={estilos.titulo}>{detalhes.title}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={estilos.textoDeMetadados}>{new Date(detalhes.release_date).getFullYear()}</Text>
          <Text style={estilos.textoDeMetadados}>{formatarDuracao(detalhes.runtime)}</Text>
          {/* MUDANÇA: Adicionada a prop 'compact' para diminuir o padding */}
          <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{color: '#fff'}} compact>{texto}</Chip>
        </View>
        <Text style={estilos.descricao}>{detalhes.overview}</Text>
        <Button
          mode="contained"
          onPress={handlePlay}
          disabled={reproduzindo}
          icon="play"
          style={estilos.botaoAssistir}
          labelStyle={estilos.textoDoBotaoAssistir}
        >
          {reproduzindo ? 'Reproduzindo...' : 'Iniciar'}
        </Button>
      </View>

      {/* Seção de Relacionados */}
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
    areaDoPlayer: {
      width: '100%',
      height: 220,
      backgroundColor: '#000',
    },
    banner: { width: '100%', height: '100%' },
    conteudo: { padding: 14 },
    titulo: { color: 'white', fontWeight: 'bold' },
    containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    textoDeMetadados: { color: '#a0a0a0', marginRight: 15 },
    etiqueta: { marginRight: 15 },
    descricao: { color: '#d0d0d0', fontSize: 15, lineHeight: 22, marginVertical: 10 },
    botaoAssistir: { backgroundColor: '#E50914', borderRadius: 5, marginVertical: 15, paddingVertical: 4 },
    textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
    secaoDeRelacionados: { marginTop: 10, marginBottom: 30 },
    tituloDeRelacionados: { color: 'white', marginLeft: 14, marginBottom: 16 },
});
