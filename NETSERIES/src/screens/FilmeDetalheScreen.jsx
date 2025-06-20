import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Alert } from 'react-native';
// PASSO 1: Adicionar IconButton e useAuth aos imports
import { Text, Button, Chip, useTheme, IconButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

import YoutubeIframe from 'react-native-youtube-iframe';
import { getMovieDetails, getMovieRecommendations, getMovieVideos, getMovieCertifications } from '../connection/movieService';
import MovieCard from '../components/MovieCard';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function FilmeDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { getCachedData } = useCache();
  const theme = useTheme();

  // PASSO 2: Pegar as funções de favoritos do nosso contexto
  const { adicionarFavorito, removerFavorito, isFavorito } = useAuth();
  
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

  // PASSO 3: Criar a lógica para o botão de favorito
  const favorito = isFavorito(itemId);

  const handleFavoritoPress = () => {
    if (favorito) {
      removerFavorito(itemId);
    } else {
      if (detalhes) {
        const itemParaSalvar = {
          id: detalhes.id,
          title: detalhes.title,
          poster_path: detalhes.poster_path,
          media_type: 'movie'
        };
        adicionarFavorito(itemParaSalvar);
      }
    }
  };

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
      if (idade >= 18) corDeFundo = '#dc3545';
      else if (idade >= 14) corDeFundo = '#0d6efd';
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
    <ScrollView style={[estilos.container, { backgroundColor: theme.colors.background }]}>
      <View style={estilos.areaDoPlayer}>
        {reproduzindo && chaveDoTrailer ? (
          <YoutubeIframe height={220} play={true} videoId={chaveDoTrailer} onChangeState={onStateChange} />
        ) : (
          <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
        )}
      </View>

      <View style={estilos.conteudo}>
        {/* PASSO 4: Alterar o JSX para adicionar o botão de favorito */}
        <View style={estilos.containerTitulo}>
          <Text variant="headlineLarge" style={[estilos.titulo, { color: theme.colors.text }]}>{detalhes.title}</Text>
          <IconButton
            icon={favorito ? "heart" : "heart-outline"}
            iconColor={theme.colors.primary}
            size={30}
            onPress={handleFavoritoPress}
            style={estilos.botaoFavorito}
          />
        </View>

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

// PASSO 5: Adicionar os novos estilos necessários
const estilos = StyleSheet.create({
  container: { flex: 1 },
  textoDeErro: { textAlign: 'center', marginTop: 50 },
  areaDoPlayer: { width: '100%', height: 220, backgroundColor: '#000' },
  banner: { width: '100%', height: '100%' },
  conteudo: { padding: 14 },
  containerTitulo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
  },
  titulo: { 
      fontWeight: 'bold',
      flex: 1,
  },
  botaoFavorito: {
      marginTop: -5,
  },
  containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  textoDeMetadados: { marginRight: 15 },
  etiqueta: { marginRight: 15 },
  descricao: { fontSize: 15, lineHeight: 22, marginVertical: 10 },
  botaoAssistir: { borderRadius: 5, marginVertical: 15, paddingVertical: 4 },
  textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
  secaoDeRelacionados: { marginTop: 10, marginBottom: 30 },
  tituloDeRelacionados: { marginLeft: 14, marginBottom: 16 },
});