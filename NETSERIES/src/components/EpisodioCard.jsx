import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Icon } from 'react-native-paper';

// O Card agora recebe um novo prop: 'estaAtivo'
export default function EpisodioCard({ episodio, aoPressionar, estaAtivo = false }) {
  if (!episodio) {
    return null;
  }

  const urlDaImagem = episodio.still_path
    ? `https://image.tmdb.org/t/p/w300${episodio.still_path}`
    : 'https://placehold.co/300x170/1F262E/FFFFFF?text=Sem+Imagem';

  return (
    // Adicionamos um estilo condicional para a borda
    <Card style={[estilos.card, estaAtivo && estilos.cardAtivo]} onPress={aoPressionar}>
      <View style={estilos.container}>
        <Image source={{ uri: urlDaImagem }} style={estilos.imagem} />
        <View style={estilos.infoContainer}>
          <Text style={estilos.titulo} numberOfLines={1}>
            {`${episodio.episode_number || 'Ep.'}. ${episodio.name || 'Título Indisponível'}`}
          </Text>
          <Text style={estilos.duracao}>{`${episodio.runtime || 'N/A'} min`}</Text>
          <Text style={estilos.descricao} numberOfLines={2}>
            {episodio.overview || 'Descrição não disponível.'}
          </Text>
        </View>
        {/* Renderiza o ícone de "play" apenas se o card estiver ativo */}
        {estaAtivo && (
          <Icon source="play-circle" color="#E50914" size={24} style={estilos.iconeAtivo} />
        )}
      </View>
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#1F262E',
    borderWidth: 2, // Borda padrão
    borderColor: 'transparent', // Borda invisível por padrão
  },
  cardAtivo: {
    borderColor: '#E50914', // Borda vermelha quando ativo
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 130,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
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
  iconeAtivo: {
    marginRight: 10,
  }
});
