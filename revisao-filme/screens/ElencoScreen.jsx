import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';

const elenco = [
  {
    nome: "Elijah Wood",
    personagem: "Frodo",
    imagem: "https://f.i.uol.com.br/fotografia/2021/12/27/164063081561ca0a1f68a9d_1640630815_5x2_lg.jpg"
  },
  {
    nome: "Viggo Mortensen",
    personagem: "Aragorn",
    imagem: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/07/03/1615375584-3c17fcbd6d8a82584770d97294261706.jpg"
  },
  {
    nome: "Ian McKellen",
    personagem: "Gandalf",
    imagem: "https://i0.wp.com/quintacapa.com.br/wp-content/uploads/2021/08/Gandalf_Tudo_que_precisa_saber_destaque_quinta_capa.png?fit=1920%2C1080&ssl=1"
  },
];

export default function ElencoScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={elenco}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.personagem}>Personagem: {item.personagem}</Text>
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
    backgroundColor: '#121212',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 12,
    elevation: 4,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  info: {
    marginTop: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  personagem: {
    fontSize: 16,
    color: '#ccc',
  },
});
