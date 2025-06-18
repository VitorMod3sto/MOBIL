import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Chip, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getMovieDetails, getMovieCertifications } from '../connection/movieService';
import { useCache } from '../contexts/CacheContext';

const { width: larguraDaTela, height: alturaDaTela } = Dimensions.get('window');

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

const ItemDeDestaque = ({ item, detalhes, aoPressionar, theme }) => {
  const urlDaImagem = `https://image.tmdb.org/t/p/w780${item.poster_path}`;
  const { corDeFundo, texto } = getEstiloDaClassificacao(detalhes?.classificacao);
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={aoPressionar}>
      <ImageBackground source={{ uri: urlDaImagem }} style={[estilos.banner, { backgroundColor: theme.colors.surface }]}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', theme.colors.background]}
          style={estilos.sobreposicao}
        >
          <Text style={[estilos.tituloDoFilme, { color: '#FFFFFF' }]} variant="displaySmall">{item.title}</Text>
          <View style={estilos.containerDeMetadados}>
            {/* MUDANÇA: A cor agora é sempre branca */}
            <Text style={[estilos.textoDeMetadados, { color: '#FFFFFF' }]}>{detalhes?.release_date?.substring(0, 4)}</Text>
            {detalhes?.classificacao !== 'L' && (
              <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{color: '#fff'}} compact>{texto}</Chip>
            )}
          </View>
          {/* MUDANÇA: A cor agora é sempre branca */}
          <Text style={[estilos.descricao, { color: '#FFFFFF' }]} numberOfLines={3}>
            {detalhes?.overview}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function DestaquePrincipal({ dados, navigation }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [detalhesCarregados, setDetalhesCarregados] = useState({});
  const { getCachedData } = useCache();
  const theme = useTheme();
  const flatListRef = useRef(null);

  useEffect(() => {
    if (!dados || dados.length === 0) return;

    const buscarTodosOsDetalhes = async () => {
      const promessasDeDetalhes = dados.map(filme => 
        Promise.all([
          getCachedData(`movieDetails-${filme.id}`, () => getMovieDetails(filme.id)),
          getCachedData(`movieCerts-${filme.id}`, () => getMovieCertifications(filme.id))
        ])
      );
      
      const resultados = await Promise.all(promessasDeDetalhes);

      const detalhesMapeados = {};
      resultados.forEach((resultado, index) => {
        const idDoFilme = dados[index].id;
        detalhesMapeados[idDoFilme] = {
          ...resultado[0], 
          classificacao: resultado[1] 
        };
      });
      
      setDetalhesCarregados(detalhesMapeados);
    };

    buscarTodosOsDetalhes();
  }, [dados, getCachedData]);

  const aoRolar = (evento) => {
    const tamanhoDoSlide = evento.nativeEvent.layoutMeasurement.width;
    const indice = Math.round(evento.nativeEvent.contentOffset.x / tamanhoDoSlide);
    setIndiceAtivo(indice);
  };

  if (!dados || dados.length === 0) {
    return <View style={estilos.banner} />;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        ref={flatListRef}
        data={dados}
        renderItem={({ item }) => (
          <ItemDeDestaque
            item={item}
            detalhes={detalhesCarregados[item.id]}
            aoPressionar={() => navigation.navigate("FilmeDetalhe", { itemId: item.id })}
            theme={theme}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoRolar}
      />
      <View style={estilos.containerDaPaginacao}>
        {dados && dados.map((_, indice) => (
          <View
            key={indice}
            style={[
              estilos.estiloDoPonto,
              { backgroundColor: indice === indiceAtivo ? theme.colors.primary : theme.colors.onSurfaceDisabled },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { 
    height: alturaDaTela * 0.6,
    marginBottom: 16,
  },
  banner: {
    width: larguraDaTela,
    height: '100%',
    justifyContent: 'flex-end',
  },
  sobreposicao: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  tituloDoFilme: {
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  containerDeMetadados: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  textoDeMetadados: {
    marginRight: 15,
    fontWeight: 'bold',
    // MUDANÇA: Sombra mais escura e nítida para criar o efeito de borda
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },
  etiqueta: {
    paddingHorizontal: 2,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    fontWeight: 'bold',
    // MUDANÇA: Sombra mais escura e nítida para criar o efeito de borda
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },
  containerDaPaginacao: { 
    position: 'absolute', 
    bottom: 15, 
    alignSelf: 'center', 
    flexDirection: 'row' 
  },
  estiloDoPonto: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginHorizontal: 4 
  },
});
