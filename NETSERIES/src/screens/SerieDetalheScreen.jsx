import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, ActivityIndicator, Chip, Menu, Button, Divider, useTheme, TouchableRipple } from 'react-native-paper';
import { getSeriesDetails, getSeasonDetails, getSeriesCertifications } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';
import { useCache } from '../contexts/CacheContext';
import LoadingScreen from '../components/LoadingScreen';

export default function SerieDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { getCachedData } = useCache();
  const theme = useTheme();

  const [detalhes, setDetalhes] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
  const [classificacao, setClassificacao] = useState('L');
  const [carregando, setCarregando] = useState(true);
  const [menuDeTemporadasVisivel, setMenuDeTemporadasVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);

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
      const dadosDosEpisodios = await getCachedData(
        `season-${itemId}-${temporadaSelecionada}`,
        () => getSeasonDetails(itemId, temporadaSelecionada)
      );
      setEpisodios(dadosDosEpisodios);
      setCarregando(false);
    };
    buscarEpisodios();
  }, [detalhes, temporadaSelecionada, getCachedData]);

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

  const abrirMenu = () => setMenuDeTemporadasVisivel(true);
  const fecharMenu = () => setMenuDeTemporadasVisivel(false);

  const { corDeFundo, texto } = getEstiloDaClassificacao(classificacao);

  return (
    <ScrollView style={[estilos.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={[estilos.titulo, { color: theme.colors.text }]}>{detalhes.name}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={[estilos.textoDeMetadados, { color: theme.colors.onSurfaceVariant }]}>{new Date(detalhes.first_air_date).getFullYear()}</Text>
          <Text style={[estilos.textoDeMetadados, { color: theme.colors.onSurfaceVariant }]}>{`${detalhes.number_of_seasons} Temporada(s)`}</Text>
          <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{ color: '#fff' }} compact>{texto}</Chip>
        </View>
        <Text style={[estilos.descricao, { color: theme.colors.onSurfaceVariant }]}>{detalhes.overview}</Text>
      </View>

      <Divider style={{ backgroundColor: theme.colors.outline }} />

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
              style={[estilos.botaoMenu, { borderColor: theme.colors.outline }]}
              contentStyle={estilos.conteudoBotaoMenu}
              labelStyle={[estilos.textoBotaoMenu, { color: theme.colors.text }]}
              rippleColor="rgba(128, 128, 128, 0.2)"
            >
              {`Temporada ${temporadaSelecionada}`}
            </Button>
          }
          style={{ marginTop: 45, width: larguraDoBotao }}
          contentStyle={[estilos.estiloDoMenu, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outline }]}
        >
          <View style={estilos.menuWrapper}>
            <ScrollView style={{ maxHeight: 300 }}>
              {detalhes.seasons
                .filter(season => season.season_number > 0)
                .map(season => {
                  const estaAtiva = temporadaSelecionada === season.season_number;
                  return (
                    <TouchableRipple
                      key={season.id}
                      onPress={() => {
                        setTemporadaSelecionada(season.season_number);
                        fecharMenu();
                      }}
                      rippleColor="rgba(0, 0, 0, .1)"
                    >
                      <View style={[
                        estilos.itemTemporada,
                        estaAtiva && estilos.menuItemAtivo
                      ]}>
                        <Text style={[estilos.textoDoMenuItem, { color: theme.colors.text }]}>
                          {`Temporada ${season.season_number}`}
                        </Text>
                      </View>
                    </TouchableRipple>
                  )
                })}
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
  container: { flex: 1 },
  textoDeErro: { textAlign: 'center', marginTop: 50 },
  banner: { width: '100%', height: 220 },
  conteudo: { padding: 14 },
  titulo: { fontWeight: 'bold' },
  containerDeMetadados: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  textoDeMetadados: { marginRight: 15 },
  etiqueta: { marginRight: 15 },
  descricao: { fontSize: 15, lineHeight: 22 },
  divisor: { marginVertical: 15 },
  secaoDeEpisodios: { paddingHorizontal: 14, marginBottom: 30 },
  botaoMenu: {},
  conteudoBotaoMenu: { flexDirection: 'row-reverse' },
  textoBotaoMenu: { fontSize: 16, fontWeight: 'bold' },
  listaDeEpisodios: { marginTop: 10 },
  menuWrapper: {
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemTemporada: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemAtivo: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  textoDoMenuItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
