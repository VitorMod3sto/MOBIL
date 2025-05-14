import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useState } from "react";

export default function NomeNumero() {
  const [nome, setNome] = useState("?????");

  const numero = "????";

  function mostraNomeNumero() {
    setNome("Vitin");
    console.log(nome);
    console.log(numero);
  }

  function alterarNome() {
    setNome("Vitu");
  }

  return (
    <View>
      <Card>
        <Card.Content>
          <Card.Title title="Componente NomeNumero" />
          <Text variant="displaySmall">Nome: {nome}</Text>
          <Text variant="displayMedium">Numero: {numero}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={mostraNomeNumero}>Mostrar</Button>
          <Button onPress={alterarNome}>Alterar Nome</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
