import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Alert } from 'react-native';
// 1. Importamos o 'useTheme'
import { Text, Button, Chip, useTheme } from 'react-native-paper';
import YoutubeIframe from 'react-native-youtube-iframe';
import { getMovieDetails, getMovieRecommendations, getMovieVideos, getMovieCertifications } from '../connection/movieService';
import MovieCard from '../components/MovieCard';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function FilmeDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { getCachedData } = useCache();
  const theme = useTheme(); // 2. Pega o objeto do tema atual

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
        getCachedData(`movieDetails-${itemId}`, () => getMovieDetails(itemId)),
        getCachedData(`movieRecs-${itemId}`, () => getMovieRecommendations(itemId)),
        getCachedData(`movieVideos-${itemId}`, () => getMovieVideos(itemId)),
        getCachedData(`movieCerts-${itemId}`, () => getMovieCertifications(itemId))
      ]);

      setDetalhes(dadosDosDetalhes);
      setRecomendacoes(dadosDasRecomendacoes);
      setChaveDoTrailer(chaveDoVideo);
      setClassificacao(dadosDaClassificacao);
      setCarregando(false);
    };
    buscarDados();
  }, [itemId, getCachedData]);

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

  const getEstiloDaClassificacao = (rating) => {
    let corDeFundo = '#28a745';
    let texto = rating || 'L';

    if (rating && !isNaN(rating)) {
      const idade = parseInt(rating);
      texto = `${idade}+`;
      if (idade >= 18) {
        corDeFundo = '#dc3545';
      } else if (idade >= 14) {
        corDeFundo = '#0d6efd';
      }
    }
    return { corDeFundo, texto };
  };

  if (carregando) {
    return <LoadingScreen />;
  }

  if (!detalhes) {
    return <Text style={[estilos.textoDeErro, { color: theme.colors.text }]}>Não foi possível carregar os detalhes.</Text>;
  }

  const formatarDuracao = (duracao) => {
    if (!duracao) return '';
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    return `${horas}h ${minutos}m`;
  };
  
  const { corDeFundo, texto } = getEstiloDaClassificacao(classificacao);

  return (
    // 3. A cor de fundo do ScrollView agora vem do tema
    <ScrollView style={[estilos.container, { backgroundColor: theme.colors.background }]}>
      <View style={estilos.areaDoPlayer}>
        {reproduzindo && chaveDoTrailer ? (
          <YoutubeIframe height={220} play={true} videoId={chaveDoTrailer} onChangeState={onStateChange} />
        ) : (
          <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
        )}
      </View>

      <View style={estilos.conteudo}>
        {/* 4. Os textos agora usam as cores do tema */}
        <Text variant="headlineLarge" style={[estilos.titulo, { color: theme.colors.text }]}>{detalhes.title}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={[estilos.textoDeMetadados, { color: theme.colors.onSurfaceVariant }]}>{new Date(detalhes.release_date).getFullYear()}</Text>
          <Text style={[estilos.textoDeMetadados, { color: theme.colors.onSurfaceVariant }]}>{formatarDuracao(detalhes.runtime)}</Text>
          <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{color: '#fff'}} compact>{texto}</Chip>
        </View>
        <Text style={[estilos.descricao, { color: theme.colors.onSurfaceVariant }]}>{detalhes.overview}</Text>
        <Button 
            mode="contained" 
            onPress={handlePlay} 
            disabled={reproduzindo} 
            icon="play" 
            style={estilos.botaoAssistir} 
            // MUDANÇA: Cores dinâmicas para o botão
            buttonColor={theme.dark ? '#E50914' : '#E50914'}
            textColor={theme.dark ? '#FFFFFF' : '#000000'}
            labelStyle={estilos.textoDoBotaoAssistir}>
          {reproduzindo ? 'Reproduzindo...' : 'Iniciar'}
        </Button>
      </View>

      <View style={estilos.secaoDeRelacionados}>
        <Text variant="headlineSmall" style={[estilos.tituloDeRelacionados, { color: theme.colors.text }]}>Relacionados</Text>
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
    container: { flex: 1 },
    textoDeErro: { textAlign: 'center', marginTop: 50 },
    areaDoPlayer: { width: '100%', height: 220, backgroundColor: '#000' },
    banner: { width: '100%', height: '100%' },
    conteudo: { padding: 14 },
    titulo: { fontWeight: 'bold' },
    containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    textoDeMetadados: { marginRight: 15 },
    etiqueta: { marginRight: 15 },
    descricao: { fontSize: 15, lineHeight: 22, marginVertical: 10 },
    // MUDANÇA: Removemos a cor de fundo fixa
    botaoAssistir: { borderRadius: 5, marginVertical: 15, paddingVertical: 4 },
    textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
    secaoDeRelacionados: { marginTop: 10, marginBottom: 30 },
    tituloDeRelacionados: { marginLeft: 14, marginBottom: 16 },
});
