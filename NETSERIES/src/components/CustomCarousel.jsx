import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, Chip, useTheme } from "react-native-paper";

const ItemDoCarrossel = ({ item, aoClicarNoItem, larguraDoItem }) => {
  const urlDaImagem = `https://image.tmdb.org/t/p/w780${item.backdrop_path}`;
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[estilos.containerDoItem, { width: larguraDoItem }]}
      onPress={() => aoClicarNoItem(item)}
    >
      <ImageBackground source={{ uri: urlDaImagem }} style={[estilos.banner, { backgroundColor: theme.colors.surface }]}>
        <View style={estilos.sobreposicao}>
          {/* MUDANÇA: A cor do título agora é sempre branca */}
          <Text style={[estilos.titulo, { color: '#FFFFFF' }]} variant="headlineLarge">{item.title || item.name}</Text>
          <Chip
            icon="star"
            style={estilos.etiqueta}
            textStyle={estilos.textoDaEtiqueta}
          >
            {item.vote_average.toFixed(1)}
          </Chip>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function CarrosselPersonalizado({ dados, aoClicarNoItem }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const referenciaFlatList = useRef(null);
  const theme = useTheme();
  const [larguraContainer, setLarguraContainer] = useState(0);

  useEffect(() => {
    if (!dados || dados.length === 0 || larguraContainer === 0) return;

    const intervalo = setInterval(() => {
      const proximoIndice = (indiceAtivo + 1) % dados.length;
      referenciaFlatList.current?.scrollToIndex({
        index: proximoIndice,
        animated: true,
      });
      setIndiceAtivo(proximoIndice);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [indiceAtivo, dados, larguraContainer]);

  const aoRolar = (evento) => {
    const tamanhoDoSlide = evento.nativeEvent.layoutMeasurement.width;
    const indice = Math.round(
      evento.nativeEvent.contentOffset.x / tamanhoDoSlide
    );
    setIndiceAtivo(indice);
  };
  
  const getItemLayout = (data, index) => ({
    length: larguraContainer,
    offset: larguraContainer * index,
    index,
  });

  if (!dados || dados.length === 0) {
    return null;
  }

  return (
    <View 
      style={estilos.container}
      onLayout={(event) => {
        setLarguraContainer(event.nativeEvent.layout.width);
      }}
    >
      <FlatList
        ref={referenciaFlatList}
        data={dados}
        renderItem={({ item }) => (
          <ItemDoCarrossel item={item} aoClicarNoItem={aoClicarNoItem} larguraDoItem={larguraContainer} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoRolar}
        getItemLayout={getItemLayout}
        style={estilos.carrossel}
      />
      <View style={estilos.containerDaPaginacao}>
  {dados.map((_, indice) => (
    <View
      key={indice}
      style={[
        estilos.estiloDoPonto,
        {
          backgroundColor: indice === indiceAtivo ? '#FF0000' : '#CCCCCC',
        },
      ]}
    />
  ))}
</View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { height: 250, width: '100%' },
  carrossel: { flex: 1 },
  containerDoItem: { height: 250 },
  banner: { flex: 1, justifyContent: "flex-end" },
  sobreposicao: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 16,
  },
  titulo: {
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  etiqueta: {
    marginTop: 8,
    width: 80,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  textoDaEtiqueta: { color: "white", fontWeight: "bold" },
  containerDaPaginacao: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  estiloDoPonto: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
});
