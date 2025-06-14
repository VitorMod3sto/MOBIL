import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList } from 'react-native';
import { Text, ActivityIndicator, Chip, Menu, Button, Divider } from 'react-native-paper';
import { getSeriesDetails, getSeasonDetails } from '../connection/movieService';
import EpisodioCard from '../components/EpisodioCard';

export default function SerieDetalheScreen({ route, navigation }) {
  const { itemId } = route.params;

  const [detalhes, setDetalhes] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [menuDeTemporadasVisivel, setMenuDeTemporadasVisivel] = useState(false);
  const [larguraDoBotao, setLarguraDoBotao] = useState(0);

  // Efeito para buscar detalhes da série
  useEffect(() => {
    const buscarDadosDaSerie = async () => {
      setCarregando(true);
      const dadosDosDetalhes = await getSeriesDetails(itemId);
      setDetalhes(dadosDosDetalhes);
    };
    buscarDadosDaSerie();
  }, [itemId]);

  // Efeito para buscar episódios
  useEffect(() => {
    if (!detalhes) return;
    const buscarEpisodios = async () => {
      const dadosDosEpisodios = await getSeasonDetails(itemId, temporadaSelecionada);
      setEpisodios(dadosDosEpisodios);
      setCarregando(false);
    };
    buscarEpisodios();
  }, [detalhes, temporadaSelecionada]);

  if (carregando) {
    return <ActivityIndicator style={estilos.carregador} size="large" />;
  }

  if (!detalhes) {
    return <Text style={estilos.textoDeErro}>Não foi possível carregar os detalhes.</Text>;
  }

  const abrirMenu = () => setMenuDeTemporadasVisivel(true);
  const fecharMenu = () => setMenuDeTemporadasVisivel(false);

  return (
    <ScrollView style={estilos.container}>
      {/* Informações da Série */}
      <Image source={{ uri: `https://image.tmdb.org/t/p/w780${detalhes.backdrop_path}` }} style={estilos.banner} />
      <View style={estilos.conteudo}>
        <Text variant="headlineLarge" style={estilos.titulo}>{detalhes.name}</Text>
        <View style={estilos.containerDeMetadados}>
          <Text style={estilos.textoDeMetadados}>{new Date(detalhes.first_air_date).getFullYear()}</Text>
          <Text style={estilos.textoDeMetadados}>{`${detalhes.number_of_seasons} Temporada(s)`}</Text>
          <Chip style={estilos.etiqueta} textStyle={{ color: '#fff' }}>16+</Chip>
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
              onLayout={(event) => {
                setLarguraDoBotao(event.nativeEvent.layout.width);
              }}
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
          style={{
            marginTop: 45,
            width: larguraDoBotao,
          }}
          contentStyle={estilos.estiloDoMenu}
        >
          {/* MUDANÇA: View extra para aplicar o overflow e borderRadius */}
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
                        console.log('Clicou no episódio:', item.name);
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
    etiqueta: { backgroundColor: '#333', marginRight: 15 },
    descricao: { color: '#d0d0d0', fontSize: 15, lineHeight: 22 },
    divisor: { marginVertical: 15, backgroundColor: '#2a2a2a' },
    secaoDeEpisodios: { paddingHorizontal: 14, marginBottom: 30 },
    botaoMenu: {
      borderColor: '#8A95A6',
    },
    conteudoBotaoMenu: { 
      flexDirection: 'row-reverse', 
    },
    textoBotaoMenu: { 
      color: 'white', 
      fontSize: 16, 
      fontWeight: 'bold' 
    },
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
