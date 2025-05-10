import { StyleSheet, View } from 'react-native';
import React from 'react';
import Escudo from '../../componentes/Escudo';
import { Text } from 'react-native-paper';

export default function EscudoScreen() {
  const time = {
    nome: "Flamengo",
    escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
    fundacao: "15 de novembro de 1895",
    estadio: "Maracanã",
    mascote: "Urubu",
    cores: ["Vermelho", "Preto"]
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Informações do Clube</Text>
      <Escudo
        nome={time.nome}
        escudo={time.escudo}
        fundacao={time.fundacao}
        estadio={time.estadio}
        mascote={time.mascote}
        cores={time.cores}
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
