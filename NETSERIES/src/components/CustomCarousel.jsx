import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, Chip } from "react-native-paper";

const { width: larguraDaTela } = Dimensions.get("window");

// MUDANÇA AQUI: O item do carrossel agora recebe 'navigation'
const ItemDoCarrossel = ({ item, navigation }) => {
  const urlDaImagem = `https://image.tmdb.org/t/p/w780${item.backdrop_path}`;
  return (
    // O clique navega para a tela de detalhes do filme
    <TouchableOpacity
      activeOpacity={0.9}
      style={estilos.containerDoItem}
      onPress={() => navigation.navigate("FilmeDetalhe", { item: item })}
    >
      <ImageBackground source={{ uri: urlDaImagem }} style={estilos.banner}>
        <View style={estilos.sobreposicao}>
          <Text style={estilos.titulo} variant="headlineLarge">
            {item.title}
          </Text>
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

// MUDANÇA AQUI: O componente recebe e repassa a 'navigation'
export default function CarrosselPersonalizado({ dados, navigation }) {
  // ... (a lógica interna do carrossel continua a mesma)
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const referenciaFlatList = useRef(null);

  useEffect(() => {
    // ... (lógica do auto-play)
    if (!dados || dados.length === 0) return;
    const intervalo = setInterval(() => {
      const proximoIndice = (indiceAtivo + 1) % dados.length;
      referenciaFlatList.current?.scrollToIndex({
        index: proximoIndice,
        animated: true,
      });
      setIndiceAtivo(proximoIndice);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indiceAtivo, dados]);

  const aoRolar = (evento) => {
    // ... (lógica de rolagem)
    const tamanhoDoSlide = evento.nativeEvent.layoutMeasurement.width;
    const indice = Math.round(
      evento.nativeEvent.contentOffset.x / tamanhoDoSlide
    );
    setIndiceAtivo(indice);
  };

  if (!dados || dados.length === 0) {
    return null;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        ref={referenciaFlatList}
        data={dados}
        // Repassa a prop de navegação para cada item
        renderItem={({ item }) => (
          <ItemDoCarrossel item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoRolar}
        style={estilos.carrossel}
      />
      {/* ... (lógica dos pontinhos de paginação) */}
      <View style={estilos.containerDaPaginacao}>
        {dados.map((_, indice) => (
          <View
            key={indice}
            style={[
              estilos.estiloDoPonto,
              {
                backgroundColor:
                  indice === indiceAtivo ? "white" : "rgba(255, 255, 255, 0.4)",
              },
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
  banner: { flex: 1, justifyContent: "flex-end" },
  sobreposicao: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 16,
  },
  titulo: {
    color: "white",
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
