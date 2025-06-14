import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function EpisodioCard({ episodio, aoPressionar }) {
  // A API da TMDB às vezes não tem imagem para um episódio.
  // Se não tiver, usamos um placeholder.
  const urlDaImagem = episodio.still_path
    ? `https://image.tmdb.org/t/p/w300${episodio.still_path}`
    : 'https://placehold.co/300x170/1F262E/FFFFFF?text=Sem+Imagem';

  return (
    <Card style={estilos.card} onPress={aoPressionar}>
      <View style={estilos.container}>
        {/* Imagem do Episódio */}
        <Image source={{ uri: urlDaImagem }} style={estilos.imagem} />

        {/* Informações do Episódio */}
        <View style={estilos.infoContainer}>
          <Text style={estilos.titulo} numberOfLines={1}>
            {/* Exibe: "1. Título do Episódio" */}
            {`${episodio.episode_number || 'Ep.'}. ${episodio.name || 'Título Indisponível'}`}
          </Text>
          <Text style={estilos.duracao}>
            {/* Usa a duração do episódio ou um valor padrão de 45 min */}
            {`${episodio.runtime || 'Duração Indisponível'} min`}
          </Text>
          <Text style={estilos.descricao} numberOfLines={2}>
            {/* Exibe a descrição ou um texto alternativo */}
            {episodio.overview || 'Descrição não disponível.'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#1F262E',
  },
  container: {
    flexDirection: 'row',
  },
  imagem: {
    width: 130,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
  },
  titulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  duracao: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 4,
  },
  descricao: {
    color: '#d0d0d0',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
});
