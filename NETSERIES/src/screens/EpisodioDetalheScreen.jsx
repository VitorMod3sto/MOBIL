import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Alert } from 'react-native';
// 1. Importa o hook 'useTheme'
import { Text, Button, Divider, Menu, useTheme } from 'react-native-paper';
import YoutubeIframe from 'react-native-youtube-iframe';
import { getSeriesVideos, getSeasonDetails } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';
import LoadingScreen from '../components/LoadingScreen';
import { useCache } from '../contexts/CacheContext';

export default function EpisodioDetalheScreen({ route, navigation }) {
  const { episodio, serieId, detalhesDaSerie } = route.params;
  const theme = useTheme(); // 2. Pega o objeto do tema atual
  const { getCachedData } = useCache();

  const [chaveDoTrailer, setChaveDoTrailer] = useState(null);
  const [reproduzindo, setReproduzindo] = useState(false);
  const [episodiosDaTemporada, setEpisodiosDaTemporada] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(episodio.season_number);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      try {
        const [chave, dados] = await Promise.all([
          getCachedData(`seriesVideos-${serieId}`, () => getSeriesVideos(serieId)),
          getCachedData(`season-${serieId}-${temporadaSelecionada}`, () => getSeasonDetails(serieId, temporadaSelecionada)),
        ]);
        setChaveDoTrailer(chave);
        setEpisodiosDaTemporada(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do episódio:", error);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarDados();
  }, [serieId, temporadaSelecionada, getCachedData]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setReproduzindo(false);
    }
  }, []);

  const handlePlay = () => {
    if (chaveDoTrailer) {
      setReproduzindo(true);
    } else {
      Alert.alert("Trailer não disponível", "Não foi possível encontrar um trailer para esta série.");
    }
  };

  if (carregando) {
    return <LoadingScreen />;
  }

  const urlDoBanner = episodio.still_path
    ? `https://image.tmdb.org/t/p/w780${episodio.still_path}`
    : `https://placehold.co/780x439/${theme.colors.surface.substring(1)}/${theme.colors.onSurface.substring(1)}?text=Imagem+Indisponível`;

  return (
    // 3. A cor de fundo do ecrã agora vem do tema
    <ScrollView style={[estilos.container, { backgroundColor: theme.colors.background }]}>
      <View style={estilos.areaDoPlayer}>
        {reproduzindo && chaveDoTrailer ? (
          <YoutubeIframe height={220} play={true} videoId={chaveDoTrailer} onChangeState={onStateChange} />
        ) : (
          <Image source={{ uri: urlDoBanner }} style={estilos.banner} />
        )}
      </View>

      <View style={estilos.conteudo}>
        {/* 4. Os textos agora usam as cores do tema */}
        <Text variant="headlineLarge" style={[estilos.titulo, { color: theme.colors.text }]}>{`${episodio.episode_number}. ${episodio.name}`}</Text>
        <Text style={[estilos.textoDeMetadados, { color: theme.colors.onSurfaceVariant }]}>{`${episodio.runtime || 'N/A'} min`}</Text>
        <Text style={[estilos.descricao, { color: theme.colors.onSurfaceVariant }]}>{episodio.overview || 'Descrição não disponível.'}</Text>
        <Button
          mode="contained"
          onPress={handlePlay}
          disabled={reproduzindo || !chaveDoTrailer}
          icon="play"
          // MUDANÇA: Cores dinâmicas para o botão
          buttonColor={theme.dark ? '#FFFFFF' : '#E50914'}
          textColor={theme.dark ? '#000000' : '#FFFFFF'}
          style={estilos.botaoAssistir}
          labelStyle={estilos.textoDoBotaoAssistir}
        >
          {reproduzindo ? 'Reproduzindo...' : (chaveDoTrailer ? 'Iniciar' : 'Trailer Indisponível')}
        </Button>
      </View>

      <Divider style={{ backgroundColor: theme.colors.outline }} />

      <View style={estilos.secaoDeEpisodios}>
        <Text variant="headlineSmall" style={[estilos.tituloDeRelacionados, { color: theme.colors.text }]}>Episódios</Text>
        <Menu
          visible={menuVisivel}
          onDismiss={() => setMenuVisivel(false)}
          anchor={
            <Button
              onLayout={(e) => setLarguraDoBotao(e.nativeEvent.layout.width)}
              onPress={() => setMenuVisivel(true)}
              icon={menuVisivel ? 'chevron-up' : 'chevron-down'}
              mode="outlined"
              style={[estilos.botaoMenu, { borderColor: theme.colors.outline }]}
              contentStyle={estilos.conteudoBotaoMenu}
              labelStyle={[estilos.textoBotaoMenu, { color: theme.colors.text }]}
            >
              {`Temporada ${temporadaSelecionada}`}
            </Button>
          }
          style={{ marginTop: 45, width: larguraDoBotao }}
          contentStyle={[estilos.estiloDoMenu, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outline }]}
        >
          <ScrollView style={{ maxHeight: 300 }}>
            {detalhesDaSerie.seasons
              .filter((season) => season.season_number > 0)
              .map((season) => (
                <Menu.Item
                  key={season.id}
                  onPress={() => {
                    setTemporadaSelecionada(season.season_number);
                    setMenuVisivel(false);
                  }}
                  title={`Temporada ${season.season_number}`}
                  style={temporadaSelecionada === season.season_number ? { backgroundColor: theme.colors.primary + '33' } : {}}
                  titleStyle={[estilos.textoDoMenuItem, { color: theme.colors.text }]}
                />
              ))}
          </ScrollView>
        </Menu>

        <FlatList
          style={estilos.listaDeEpisodios}
          data={episodiosDaTemporada}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EpisodioCard
              episodio={item}
              estaAtivo={item.id === episodio.id}
              aoPressionar={() => {
                navigation.push('EpisodioDetalhe', {
                  episodio: item,
                  serieId: serieId,
                  detalhesDaSerie: detalhesDaSerie,
                });
              }}
            />
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  areaDoPlayer: { width: '100%', height: 220, backgroundColor: '#000' },
  banner: { width: '100%', height: '100%' },
  conteudo: { padding: 14 },
  titulo: { fontWeight: 'bold' },
  textoDeMetadados: { marginVertical: 10 },
  descricao: { fontSize: 15, lineHeight: 22, marginVertical: 10 },
  botaoAssistir: {
    borderRadius: 5,
    marginVertical: 15,
    paddingVertical: 4,
  },
  textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
  divisor: { marginVertical: 15 },
  secaoDeEpisodios: { paddingHorizontal: 14, marginBottom: 30 },
  tituloDeRelacionados: { fontWeight: 'bold', fontSize: 20, marginBottom: 16 },
  listaDeEpisodios: { marginTop: 10 },
  botaoMenu: {},
  conteudoBotaoMenu: { flexDirection: 'row-reverse' },
  textoBotaoMenu: { fontSize: 16, fontWeight: 'bold' },
  estiloDoMenu: {
    borderRadius: 4,
    borderWidth: 1,
  },
  textoDoMenuItem: { fontSize: 16, fontWeight: 'bold' },
});
