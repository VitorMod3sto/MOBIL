import { StyleSheet } from 'react-native';
import React from 'react';
import { Card, Text, Chip } from 'react-native-paper';

export default function Escudo(props) {
  const { nome, escudo, fundacao, estadio, mascote, cores } = props;

  return (
    <Card style={styles.card}>
      <Card.Title title={nome} subtitle={`Fundado em ${fundacao}`} />
      <Card.Content>
        <Text>Estádio: {estadio}</Text>
        <Text>Mascote: {mascote}</Text>
        <Text style={styles.label}>Cores:</Text>
        <Card.Actions style={styles.chips}>
          {cores.map((cor, index) => (
            <Chip key={index} style={styles.chip}>{cor}</Chip>
          ))}
        </Card.Actions>
      </Card.Content>
      <Card.Cover source={{ uri: escudo }} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  label: {
    marginTop: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  chip: {
    marginRight: 4,
  },
});
