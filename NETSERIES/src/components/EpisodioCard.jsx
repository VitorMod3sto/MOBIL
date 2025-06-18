import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
// 1. Importa o hook 'useTheme'
import { Text, Card, Icon, useTheme } from 'react-native-paper';

export default function EpisodioCard({ episodio, aoPressionar, estaAtivo = false }) {
  const theme = useTheme(); // 2. Pega o objeto do tema atual

  if (!episodio) {
    return null;
  }

  // O placeholder agora também usa as cores do tema
  const urlDaImagem = episodio.still_path
    ? `https://image.tmdb.org/t/p/w300${episodio.still_path}`
    : `https://placehold.co/300x170/${theme.colors.surfaceVariant.substring(1)}/${theme.colors.onSurface.substring(1)}?text=Sem+Imagem`;

  return (
    // 3. O fundo do card e a borda agora usam as cores do tema
    <Card 
      style={[
        estilos.card, 
        { backgroundColor: theme.dark ? '#1F262E' : '#F5F5F5' },
        { borderColor: theme.dark ? theme.colors.outline : 'black', borderWidth: 1 },
        estaAtivo && { borderColor: theme.colors.primary, borderWidth: 2 }
      ]} 
      onPress={aoPressionar}
    >
      <View style={estilos.container}>
        <Image source={{ uri: urlDaImagem }} style={estilos.imagem} />
        <View style={estilos.infoContainer}>
          {/* 4. Os textos também usam as cores do tema */}
          <Text style={[estilos.titulo, { color: theme.colors.text }]} numberOfLines={1}>
            {`${episodio.episode_number || 'Ep.'}. ${episodio.name || 'Título Indisponível'}`}
          </Text>
          <Text style={[estilos.duracao, { color: theme.colors.onSurfaceVariant }]}>
            {`${episodio.runtime || 'N/A'} min`}
          </Text>
          <Text style={[estilos.descricao, { color: theme.dark ? theme.colors.onSurfaceVariant : 'black' }]} numberOfLines={2}>
            {episodio.overview || 'Descrição não disponível.'}
          </Text>
        </View>
        {estaAtivo && (
          <Icon source="play-circle" color={theme.colors.primary} size={24} style={estilos.iconeAtivo} />
        )}
      </View>
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: {
    marginBottom: 15,
    // CORREÇÃO: A propriedade 'overflow: hidden' foi removida daqui
    // para evitar o warning do Surface.
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 120,
    height: 90,
    marginLeft: 5,
    borderRadius: 8, // O arredondamento da imagem garante o efeito visual
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  duracao: {
    fontSize: 12,
    marginTop: 4,
  },
  descricao: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  iconeAtivo: {
    marginRight: 10,
  }
});
