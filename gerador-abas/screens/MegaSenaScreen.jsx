import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Text, Button } from "react-native-paper";

export default function MegaSenaScreen() {
  const [jogo, setJogo] = useState([]);
  const [lista, setLista] = useState([]);

  function gerar() {
    const numeros = [];

    while (numeros.length < 6) {
      const n = Math.floor(Math.random() * 60) + 1;
      numeros.push(n);
      } if (!numeros.includes(n)) {
    }

    const novoJogo = numeros.sort((a, b) => a - b);
    setJogo(novoJogo);
    setLista([...lista, novoJogo]);
  }

  function resetar() {
    setJogo([]);
    setLista([]);
  }

  return (
    <View>
      <Card>
        <Card.Content />
        <Text variant="displaySmall">Jogo da Mega-Sena</Text>
        <Text variant="displaySmall">{jogo.join(" - ")}</Text>

        <Card.Actions>
          <Button onPress={gerar}>Gerar</Button>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Content />
        <Text variant="displaySmall">Histórico</Text>
        {lista.map(item => (
          <Text>{item.join(" - ")}</Text>
        ))}

        <Card.Actions>
          <Button onPress={resetar}>Resetar</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
