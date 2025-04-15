import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import React from 'react';

const jogadores = [
  {
    nome: "Gabriel Barbosa",
    numero: 9,
    imagem: "https://i.pinimg.com/474x/1d/9f/5d/1d9f5de58831c9913f925a7155bdc7da.jpg"
  },
  {
    nome: "Arrascaeta",
    numero: 14,
    imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg"
  },
  {
    nome: "Everton Ribeiro",
    numero: 7,
    imagem: "https://i.pinimg.com/236x/39/1a/27/391a275fb7e0b018f2900f0f9fc9331b.jpg"
  },
  {
    nome: "David Luiz",
    numero: 23,
    imagem: "https://i.pinimg.com/474x/98/79/9b/98799b86107a87b79dc9b15cf778fa4a.jpg"
  },
  {
    nome: "Pedro",
    numero: 21,
    imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg"
  },
];

export default function JogadoresScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={jogadores}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View style={styles.textContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.numero}>Camisa {item.numero}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  numero: {
    fontSize: 14,
    color: '#FFD700',
  },
});
