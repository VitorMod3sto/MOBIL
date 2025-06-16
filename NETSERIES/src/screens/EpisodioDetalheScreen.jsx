import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, Button, Divider, Menu } from 'react-native-paper';
import YoutubeIframe from 'react-native-youtube-iframe';
import { getSeriesVideos, getSeasonDetails } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';
import LoadingScreen from '../components/LoadingScreen'; // 1. Importa a tela de carregamento

export default function EpisodioDetalheScreen({ route, navigation }) {
  const { episodio, serieId, detalhesDaSerie } = route.params;

  const [chaveDoTrailer, setChaveDoTrailer] = useState(null);
  const [reproduzindo, setReproduzindo] = useState(false);
  
  const [episodiosDaTemporada, setEpisodiosDaTemporada] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(episodio.season_number);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);

  // 2. Unificamos o estado de carregamento
  const [carregando, setCarregando] = useState(true);

  // Efeito para buscar todos os dados necessários (trailer e lista de episódios)
  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true); // Inicia o carregamento
      try {
        // Busca o trailer e os episódios da temporada em paralelo
        const [chave, dados] = await Promise.all([
          getSeriesVideos(serieId),
          getSeasonDetails(serieId, temporadaSelecionada)
        ]);
        setChaveDoTrailer(chave);
        setEpisodiosDaTemporada(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do episódio:", error);
      } finally {
        setCarregando(false); // Para o carregamento, independentemente do resultado
      }
    };
    
    buscarDados();
  }, [serieId, temporadaSelecionada]); // Busca novamente se a temporada ou a série mudar

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setReproduzindo(false);
    }
  }, []);

  const handlePlay = () => {
    if (chaveDoTrailer) {
      setReproduzindo(true);
    } else {
      // O Alert foi removido para uma experiência mais limpa, o botão já informa
    }
  };

  // 3. Se estiver a carregar, exibe a nossa tela de carregamento
  if (carregando) {
    return <LoadingScreen />;
  }

  const urlDoBanner = episodio.still_path
    ? `https://image.tmdb.org/t/p/w780${episodio.still_path}`
    : 'https://placehold.co/780x439/14181C/FFFFFF?text=Imagem+Indisponível';

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
          disabled={reproduzindo || !chaveDoTrailer} // Desativa se estiver a tocar OU se não houver trailer
          icon="play"
          style={estilos.botaoAssistir}
          labelStyle={estilos.textoDoBotaoAssistir}
        >
          {reproduzindo ? 'Reproduzindo...' : (chaveDoTrailer ? 'Iniciar' : 'Trailer Indisponível')}
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
