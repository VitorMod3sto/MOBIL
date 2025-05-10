import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import Titulo from '../../componentes/Titulo';

export default function TituloScreen() {
  const titulos = [
    {
      nome: "Campeonato Brasileiro",
      anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020],
    },
    {
      nome: "Copa Libertadores da América",
      anos: [1981, 2019, 2022],
    },
    {
      nome: "Copa do Brasil",
      anos: [1990, 2006, 2013, 2022, 2024],
    },
    {
      nome: "Supercopa do Brasil",
      anos: [2020, 2021, 2025],
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Títulos do Flamengo</Text>
      <FlatList
        data={titulos}
        renderItem={({ item }) => (
          <Titulo nome={item.nome} anos={item.anos} />
        )}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
