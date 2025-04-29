import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Card, Title, Text } from 'react-native-paper';


const copa = {
  nome: "Copa do Mundo FIFA 2022",
  imagem: 'https://i.pinimg.com/236x/00/63/15/00631561f4895a630508c2b0d0bdb4d1.jpg',
  local: "Qatar",
  organizacao: "FIFA",
  mascote: "La'eeb",
  edicao: 22,
  ano: 2022,
  campeao: "Argentina",
  viceCampeao: "França",
};

export default function CopaScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.cardInfo}>
        <Image
          source={{ uri: copa.imagem }}
          style={styles.imagemCopa}
          resizeMode="cover" 
        />
        <Card.Content>
          <Title style={styles.titulo}>{copa.nome}</Title>
          <Text style={styles.texto}>Local: {copa.local}</Text>
          <Text style={styles.texto}>Organização: {copa.organizacao}</Text>
          <Text style={styles.texto}>Mascote: {copa.mascote}</Text>
          <Text style={styles.texto}>Edição: {copa.edicao}</Text>
          <Text style={styles.texto}>Ano: {copa.ano}</Text>
          <Text style={styles.texto}>Campeão: {copa.campeao}</Text>
          <Text style={styles.texto}>Vice-Campeão: {copa.viceCampeao}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cardInfo: {
    width: '90%',
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden', 
    elevation: 5,
  },
  imagemCopa: {
    width: '100%', 
    height: 400,  
    backgroundColor: '#000', 
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    marginBottom: 5,
  },
  texto: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
});
