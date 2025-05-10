import { StyleSheet } from 'react-native';
import React from 'react';
import { Card, Text, Chip } from 'react-native-paper';

export default function Titulo(props) {
  const { nome, anos } = props;

  return (
    <Card style={styles.card}>
      <Card.Title title={nome} />
      <Card.Content style={styles.content}>
        <Text style={styles.label}>Anos conquistados:</Text>
        <Card.Actions style={styles.chips}>
          {anos.map((ano, index) => (
            <Chip key={index} style={styles.chip}>{ano}</Chip>
          ))}
        </Card.Actions>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
  },
  label: {
    marginBottom: 6,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 6,
    marginBottom: 6,
  },
  content: {
    paddingBottom: 8,
  },
});
