import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, ActivityIndicator, Chip, Menu, Button, Divider } from 'react-native-paper';
// 1. Importa a nova função de serviço
import { getSeriesDetails, getSeasonDetails, getSeriesCertifications } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';
import { useCache } from '../contexts/CacheContext'; // 1. Importa o hook
import LoadingScreen from '../components/LoadingScreen'; // 1. Importa a tela


export default function SerieDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;

  const [detalhes, setDetalhes] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
  const [classificacao, setClassificacao] = useState('L'); // 2. Novo estado para a classificação
  const [carregando, setCarregando] = useState(true);
  const [menuDeTemporadasVisivel, setMenuDeTemporadasVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);
  const { getCachedData } = useCache();

  // Efeito para buscar detalhes da série e sua classificação
  useEffect(() => {
    const buscarDadosDaSerie = async () => {
      setCarregando(true);
      const [dadosDosDetalhes, dadosDaClassificacao] = await Promise.all([
        getCachedData(`seriesDetails-${itemId}`, () => getSeriesDetails(itemId)),
        getCachedData(`seriesCerts-${itemId}`, () => getSeriesCertifications(itemId)),
      ]);
      setDetalhes(dadosDosDetalhes);
      setClassificacao(dadosDaClassificacao);
    };
    buscarDadosDaSerie();
  }, [itemId, getCachedData]);

  useEffect(() => {
    if (!detalhes) return;
    const buscarEpisodios = async () => {
      // 3. Busca os episódios da temporada usando o cache
      const dadosDosEpisodios = await getCachedData(
        `season-${itemId}-${temporadaSelecionada}`, 
        () => getSeasonDetails(itemId, temporadaSelecionada)
      );
      setEpisodios(dadosDosEpisodios);
      setCarregando(false);
    };
    buscarEpisodios();
  }, [detalhes, temporadaSelecionada, getCachedData]);

  // Função auxiliar para estilizar a classificação
  const getEstiloDaClassificacao = (rating) => {
    let corDeFundo = '#28a745'; // Verde (Livre)
    let texto = rating || 'L';

    if (rating && !isNaN(rating)) {
      const idade = parseInt(rating);
      texto = `${idade}+`;
      if (idade >= 18) {
        corDeFundo = '#dc3545'; // Vermelho
      } else if (idade >= 14) {
        corDeFundo = '#0d6efd'; // Azul
      }
    }
    return { corDeFundo, texto };
  };

  // 2. MUDANÇA: Usa a nova tela de carregamento
  if (carregando) {
    return <LoadingScreen />;
  }

  if (!detalhes) {
    return <Text style={estilos.textoDeErro}>Não foi possível carregar os detalhes.</Text>;
  }

  const abrirMenu = () => setMenuDeTemporadasVisivel(true);
  const fecharMenu = () => setMenuDeTemporadasVisivel(false);

  // Pega o estilo e o texto formatado para a classificação
  const { corDeFundo, texto } = getEstiloDaClassificacao(classificacao);

  return (
    <ScrollView style={estilos.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={estilos.titulo}>{detalhes.name}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={estilos.textoDeMetadados}>{new Date(detalhes.first_air_date).getFullYear()}</Text>
          <Text style={estilos.textoDeMetadados}>{`${detalhes.number_of_seasons} Temporada(s)`}</Text>
          {/* 5. Exibe a classificação dinâmica com cores e texto corretos */}
          <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{ color: '#fff' }} compact>{texto}</Chip>
        </View>
        <Text style={estilos.descricao}>{detalhes.overview}</Text>
      </View>

      <Divider style={estilos.divisor} />

      {/* Seletor de Temporadas e Lista de Episódios */}
      <View style={estilos.secaoDeEpisodios}>
        <Menu
          visible={menuDeTemporadasVisivel}
          onDismiss={fecharMenu}
          anchor={
            <Button
              onLayout={(event) => setLarguraDoBotao(event.nativeEvent.layout.width)}
              onPress={abrirMenu}
              icon={menuDeTemporadasVisivel ? "chevron-up" : "chevron-down"}
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
          <View style={{ borderRadius: 4, overflow: 'hidden' }}>
            <ScrollView style={{ maxHeight: 300 }}>
              {detalhes.seasons
                .filter(season => season.season_number > 0)
                .map(season => (
                  <Menu.Item
                    key={season.id}
                    onPress={() => {
                      setTemporadaSelecionada(season.season_number);
                      fecharMenu();
                    }}
                    title={`Temporada ${season.season_number}`}
                    titleStyle={estilos.textoDoMenuItem}
                  />
                ))}
            </ScrollView>
          </View>
        </Menu>

        <FlatList
          style={estilos.listaDeEpisodios}
          data={episodios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <EpisodioCard
              episodio={item}
              aoPressionar={() => {
                navigation.navigate('EpisodioDetalhe', {
                  episodio: item,
                  serieId: detalhes.id,
                  detalhesDaSerie: detalhes,
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
    carregador: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14181C' },
    textoDeErro: { color: 'white', textAlign: 'center', marginTop: 50 },
    banner: { width: '100%', height: 220 },
    conteudo: { padding: 14 },
    titulo: { color: 'white', fontWeight: 'bold' },
    containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    textoDeMetadados: { color: '#a0a0a0', marginRight: 15 },
    etiqueta: { marginRight: 15 },
    descricao: { color: '#d0d0d0', fontSize: 15, lineHeight: 22 },
    divisor: { marginVertical: 15, backgroundColor: '#2a2a2a' },
    secaoDeEpisodios: { paddingHorizontal: 14, marginBottom: 30 },
    botaoMenu: { borderColor: '#8A95A6' },
    conteudoBotaoMenu: { flexDirection: 'row-reverse' },
    textoBotaoMenu: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    listaDeEpisodios: { marginTop: 10 },
    estiloDoMenu: {
      backgroundColor: '#1F262E',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#8A95A6',
    },
    textoDoMenuItem: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
});
