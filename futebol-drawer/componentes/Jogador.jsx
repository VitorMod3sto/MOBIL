import { StyleSheet } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

export default function Jogador(props) {
  const { nome, numero, posicao, idade, imagem } = props;

  return (
    <Card >
      <Card.Title title={nome} subtitle={`Nº ${numero} - ${posicao}`} />
      <Card.Content>
        <Text>Idade: {idade} anos</Text>
      </Card.Content>
      <Card.Cover source={{ uri: imagem }} />
    </Card>
  );
}

