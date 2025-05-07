import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function ItemScreen({ navigation, route }) {
    // passo as propriedades navigation e route
  const carro = route.params.item;
  // Recebo o item do params

  // Crio o Card do carro
  // Botão de voltar com a função navigation.goBack
  return (
    <View>
      <Card>
        <Card.Content>
          <Text>Carro: {carro.nome}</Text>
          <Text>Carro: {carro.ano}</Text>
          <Text>Carro: {carro.fabricante}</Text>
          <Text>Carro: {carro.cor}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained-tonal"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
