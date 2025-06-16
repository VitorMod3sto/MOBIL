import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Chip } from 'react-native-paper';
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
      if (idade >= 18) corDeFundo = '#dc3545';
      else if (idade >= 14) corDeFundo = '#0d6efd';
    }
    return { corDeFundo, texto };
};

// O item do carrossel agora recebe todos os seus detalhes de uma vez
const ItemDeDestaque = ({ item, detalhes, aoPressionar }) => {
  const urlDaImagem = `https://image.tmdb.org/t/p/w780${item.poster_path}`;
  const { corDeFundo, texto } = getEstiloDaClassificacao(detalhes?.classificacao);
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={aoPressionar}>
      <ImageBackground source={{ uri: urlDaImagem }} style={estilos.banner}>
        <LinearGradient
          colors={['transparent', 'rgba(20, 24, 28, 0.8)', '#14181C']}
          style={estilos.sobreposicao}
        >
          <Text style={estilos.tituloDoFilme} variant="displaySmall">{item.title}</Text>
          <View style={estilos.containerDeMetadados}>
            <Text style={estilos.textoDeMetadados}>{detalhes?.release_date?.substring(0, 4)}</Text>
            {detalhes?.classificacao !== 'L' && (
              <Chip style={[estilos.etiqueta, { backgroundColor: corDeFundo }]} textStyle={{color: '#fff'}} compact>{texto}</Chip>
            )}
          </View>
          <Text style={estilos.descricao} numberOfLines={3}>
            {detalhes?.overview}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function DestaquePrincipal({ dados, navigation }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  // MUDANÇA: Um estado para guardar os detalhes de TODOS os filmes do carrossel
  const [detalhesCarregados, setDetalhesCarregados] = useState({});
  const { getCachedData } = useCache();
  const flatListRef = useRef(null);

  // MUDANÇA: Este efeito agora busca os detalhes de todos os filmes de uma vez
  useEffect(() => {
    if (!dados || dados.length === 0) return;

    const buscarTodosOsDetalhes = async () => {
      // Cria uma lista de "promessas" para buscar os detalhes de cada filme
      const promessasDeDetalhes = dados.map(filme => 
        Promise.all([
          getCachedData(`movieDetails-${filme.id}`, () => getMovieDetails(filme.id)),
          getCachedData(`movieCerts-${filme.id}`, () => getMovieCertifications(filme.id))
        ])
      );
      
      // Espera todas as buscas terminarem
      const resultados = await Promise.all(promessasDeDetalhes);

      // Organiza os resultados num formato fácil de usar: { idDoFilme: { detalhes, classificacao } }
      const detalhesMapeados = {};
      resultados.forEach((resultado, index) => {
        const idDoFilme = dados[index].id;
        detalhesMapeados[idDoFilme] = {
          ...resultado[0], // Detalhes do filme (overview, etc.)
          classificacao: resultado[1] // Classificação de idade
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
          // Passamos os detalhes pré-carregados para o componente de item
          <ItemDeDestaque
            item={item}
            detalhes={detalhesCarregados[item.id]}
            aoPressionar={() => navigation.navigate("FilmeDetalhe", { itemId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoRolar}
      />
      <View style={estilos.containerDaPaginacao}>
        {dados.map((_, indice) => (
          <View
            key={indice}
            style={[
              estilos.estiloDoPonto,
              { backgroundColor: indice === indiceAtivo ? 'white' : 'rgba(255, 255, 255, 0.4)' },
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
    backgroundColor: '#1F262E'
  },
  sobreposicao: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  tituloDoFilme: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  containerDeMetadados: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  textoDeMetadados: {
    color: '#d0d0d0',
    marginRight: 15,
    fontWeight: '600',
  },
  etiqueta: {
    paddingHorizontal: 2,
  },
  descricao: {
    color: '#d0d0d0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
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
