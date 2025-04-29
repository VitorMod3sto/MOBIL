import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Title, Text, IconButton } from 'react-native-paper';

const estatisticas = {
  totalPublico: 3404252,
  totalJogos: 64,
  totalGols: 172,
  totalCartoes: 301,
  totalCartoesAmarelos: 288,
  totalCartoesVermelhos: 13,
  totalEstadios: 8,
  totalSelecoes: 32,
  totalJogadores: 831
};

const calcularMediaGols = () => {
  return (estatisticas.totalGols / estatisticas.totalJogos).toFixed(2);
};

const calcularMediaPublico = () => {
  return (estatisticas.totalPublico / estatisticas.totalJogos).toFixed(0);
};

const calcularMediaCartoes = () => {
  return (estatisticas.totalCartoes / estatisticas.totalJogos).toFixed(2);
};

export default function EstatisticaScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.titulo}>Estatísticas da Copa 2022</Title>
          
          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="soccer" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Total de Gols: {estatisticas.totalGols}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="football" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Total de Jogos: {estatisticas.totalJogos}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="account-group" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Total de Público: {estatisticas.totalPublico.toLocaleString()}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="chart-line" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Média de Gols por Jogo: {calcularMediaGols()}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="account" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Média de Público por Jogo: {calcularMediaPublico()}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <IconButton 
              icon="card" 
              size={30} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.texto}>Média de Cartões por Jogo: {calcularMediaCartoes()}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 15,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  card: {
    backgroundColor: '#333',
    width: '90%', 
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'flex-start', 
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', 
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#fff', 
    marginBottom: 5,
  },
  estatisticaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
});
