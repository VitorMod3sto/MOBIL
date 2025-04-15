import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const filme = {
  nome: "O Senhor dos Anéis: O Retorno do Rei",
  cartaz: "https://i.ytimg.com/vi/OQgySPQ5M3Y/maxresdefault.jpg"
};

export default function FilmeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{filme.nome}</Text>
      <Image source={{ uri: filme.cartaz }} style={styles.cartaz} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37'

,
    marginBottom: 20,
    textAlign: 'center',
  },
  cartaz: {
    width: 300,
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
  },
})
