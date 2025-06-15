import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, Button, ActivityIndicator, Divider, Menu } from 'react-native-paper';
import YoutubeIframe from 'react-native-youtube-iframe';
import { getSeriesVideos, getSeasonDetails } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';

export default function EpisodioDetalheScreen({ route, navigation }) {
  const { episodio, serieId, detalhesDaSerie } = route.params;

  const [chaveDoTrailer, setChaveDoTrailer] = useState(null);
  const [reproduzindo, setReproduzindo] = useState(false);
  const [carregandoTrailer, setCarregandoTrailer] = useState(true);
  const [trailerIndisponivel, setTrailerIndisponivel] = useState(false);

  const [episodiosDaTemporada, setEpisodiosDaTemporada] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(episodio.season_number);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);

  useEffect(() => {
    const buscarTrailer = async () => {
      setCarregandoTrailer(true);
      const chave = await getSeriesVideos(serieId);
      setChaveDoTrailer(chave);
      setCarregandoTrailer(false);
    };
    buscarTrailer();
  }, [serieId]);

  useEffect(() => {
    const buscarEpisodios = async () => {
      const dados = await getSeasonDetails(serieId, temporadaSelecionada);
      setEpisodiosDaTemporada(dados);
    };
    buscarEpisodios();
  }, [serieId, temporadaSelecionada]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setReproduzindo(false);
    }
  }, []);

  const handlePlay = () => {
    if (chaveDoTrailer) {
      setReproduzindo(true);
      setTrailerIndisponivel(false);
    } else {
      setTrailerIndisponivel(true);
    }
  };

  const urlDoBanner = episodio.still_path
    ? `https://image.tmdb.org/t/p/w780${episodio.still_path}`
    : 'https://placehold.co/780x439/14181C/FFFFFF?text=Imagem+Indisponível';

  return (
    <ScrollView style={estilos.container}>
      {/* Área do Player / Mensagem / Banner */}
      <View style={estilos.areaDoPlayer}>
        {reproduzindo && chaveDoTrailer ? (
          <YoutubeIframe
            height={220}
            play={true}
            videoId={chaveDoTrailer}
            onChangeState={onStateChange}
          />
        ) : trailerIndisponivel ? (
          <View style={[estilos.banner, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={estilos.mensagemIndisponivel}>
              O trailer está temporariamente indisponível.
            </Text>
          </View>
        ) : (
          <Image source={{ uri: urlDoBanner }} style={estilos.banner} />
        )}
      </View>

      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={estilos.titulo}>{`${episodio.episode_number}. ${episodio.name}`}</Text>
        <Text style={estilos.textoDeMetadados}>{`${episodio.runtime || 'N/A'} min`}</Text>
        <Text style={estilos.descricao}>{episodio.overview || 'Descrição não disponível.'}</Text>
        <Button
          mode="contained"
          onPress={handlePlay}
          disabled={reproduzindo || carregandoTrailer}
          icon="play"
          style={estilos.botaoAssistir}
          labelStyle={estilos.textoDoBotaoAssistir}
        >
          {carregandoTrailer ? 'Buscando Trailer...' : reproduzindo ? 'Reproduzindo...' : 'Iniciar'}
        </Button>
      </View>

      <Divider style={estilos.divisor} />

      {/* Lista de Episódios por Temporada */}
      <View style={estilos.secaoDeEpisodios}>
        <Menu
          visible={menuVisivel}
          onDismiss={() => setMenuVisivel(false)}
          anchor={
            <Button
              onLayout={(e) => setLarguraDoBotao(e.nativeEvent.layout.width)}
              onPress={() => setMenuVisivel(true)}
              icon={menuVisivel ? 'chevron-up' : 'chevron-down'}
              mode="outlined"
              style={estilos.botaoMenu}
              contentStyle={estilos.conteudoBotaoMenu}
              labelStyle={estilos.textoBotaoMenu}
            >
              {`Temporada ${temporadaSelecionada}`}
            </Button>
          }
          style={{ marginTop: 45, width: larguraDoBotao }}
          contentStyle={estilos.estiloDoMenu}
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
                  titleStyle={estilos.textoDoMenuItem}
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
  container: { flex: 1, backgroundColor: '#14181C' },
  areaDoPlayer: { width: '100%', height: 220, backgroundColor: '#000' },
  banner: { width: '100%', height: '100%' },
  mensagemIndisponivel: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  conteudo: { padding: 14 },
  titulo: { color: 'white', fontWeight: 'bold' },
  textoDeMetadados: { color: '#a0a0a0', marginVertical: 10 },
  descricao: { color: '#d0d0d0', fontSize: 15, lineHeight: 22, marginVertical: 10 },
  botaoAssistir: {
    backgroundColor: '#E50914',
    borderRadius: 5,
    marginVertical: 15,
    paddingVertical: 4,
  },
  textoDoBotaoAssistir: { fontSize: 16, fontWeight: 'bold' },
  divisor: { marginVertical: 15, backgroundColor: '#2a2a2a' },
  secaoDeEpisodios: { paddingHorizontal: 14, marginBottom: 30 },
  tituloDeRelacionados: { color: 'white', marginBottom: 16 },
  listaDeEpisodios: { marginTop: 10 },
  botaoMenu: { borderColor: '#8A95A6' },
  conteudoBotaoMenu: { flexDirection: 'row-reverse' },
  textoBotaoMenu: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  estiloDoMenu: {
    backgroundColor: '#1F262E',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8A95A6',
  },
  textoDoMenuItem: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
