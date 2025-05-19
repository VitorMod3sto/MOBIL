import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Text, Button } from "react-native-paper";

export default function Pessoa() {
  const [pessoa, setPessoa] = useState({});

  function revelar() {
    const novaPessoa = {
      nome: "Cerrissete",
      idade: "7",
      imagem:
        "https://static.poder360.com.br/2025/01/Cristiano-Ronaldo-1-848x477.png",
    };
    setPessoa(novaPessoa);
  }

  function revelar2() {
    const novaPessoa = {
      nome: "Mezi",
      idade: "10",
      imagem:
        "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/messi-argentina-e1729106596791.jpg?w=1200&h=675&crop=1",
    };
    setPessoa(novaPessoa);
  }

  return (
    <View>
      <Card>
        <Card.Content />
        <Text variant="displaySmall">Componente Pessoa</Text>
        <Text variant="displaySmall">Nome: {pessoa.nome}</Text>
        <Text variant="displaySmall">Idade: {pessoa.idade}</Text>
        <Card.Cover source={{ uri: pessoa.imagem }} />

        <Card.Actions>
          <Button onPress={revelar}>Revelar</Button>
          <Button onPress={revelar2}>Revelar 2</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
