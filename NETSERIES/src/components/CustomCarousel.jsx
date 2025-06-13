import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Chip } from 'react-native-paper';

// Pega a largura da tela para o carrossel
const { width: larguraDaTela } = Dimensions.get('window');

// Componente para renderizar cada slide do carrossel
const ItemDoCarrossel = ({ item }) => {
  const urlDaImagem = `https://image.tmdb.org/t/p/w780${item.backdrop_path}`;
  return (
    <TouchableOpacity activeOpacity={0.9} style={estilos.containerDoItem}>
      <ImageBackground source={{ uri: urlDaImagem }} style={estilos.banner}>
        <View style={estilos.sobreposicao}>
          <Text style={estilos.titulo} variant="headlineLarge">{item.title}</Text>
          <Chip icon="star" style={estilos.etiqueta} textStyle={estilos.textoDaEtiqueta}>
            {item.vote_average.toFixed(1)}
          </Chip>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente principal do Carrossel
export default function CarrosselPersonalizado({ dados }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const referenciaFlatList = useRef(null);

  // Efeito para o auto-play
  useEffect(() => {
    if (!dados || dados.length === 0) return;

    const intervalo = setInterval(() => {
      // Calcula o próximo índice
      const proximoIndice = (indiceAtivo + 1) % dados.length;
      
      // Move o carrossel para o próximo índice
      referenciaFlatList.current?.scrollToIndex({
        index: proximoIndice,
        animated: true,
      });
      setIndiceAtivo(proximoIndice);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar
  }, [indiceAtivo, dados]);

  // Função para atualizar o índice ativo ao rolar manualmente
  const aoRolar = (evento) => {
    const tamanhoDoSlide = evento.nativeEvent.layoutMeasurement.width;
    const indice = Math.round(evento.nativeEvent.contentOffset.x / tamanhoDoSlide);
    setIndiceAtivo(indice);
  };

  if (!dados || dados.length === 0) {
    return null; // Não renderiza nada se não houver dados
  }

  return (
    <View style={estilos.container}>
      <FlatList
        ref={referenciaFlatList}
        data={dados}
        renderItem={({ item }) => <ItemDoCarrossel item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoRolar} // Atualiza o índice após o scroll
        style={estilos.carrossel}
      />
      {/* Indicadores de Paginação (pontinhos) */}
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
    container: { marginBottom: 16, height: 250 },
    carrossel: { flex: 1 },
    containerDoItem: { width: larguraDaTela, height: 250 },
    banner: { flex: 1, justifyContent: 'flex-end' },
    sobreposicao: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end', padding: 16 },
    titulo: { color: 'white', fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
    etiqueta: { marginTop: 8, width: 80, backgroundColor: 'rgba(255, 255, 255, 0.25)' },
    textoDaEtiqueta: { color: 'white', fontWeight: 'bold' },
    containerDaPaginacao: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row' },
    estiloDoPonto: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
});
