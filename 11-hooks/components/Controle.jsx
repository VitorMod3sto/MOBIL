import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Card } from "react-native-paper";

export default function Controle() {
  const [volume, setVolume] = useState(50);

  function aumentar() {
    setVolume(volume + 1);
  }

  function diminuir() {
    setVolume(volume - 1);
  }

  return (
    <View>
      <Card>
        <Card.Content>
          <Card.Title title="Componente Controle" />
          <Text variant="displayMedium">Volume: {volume}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained-tonel" icon="minus" onPress={diminuir}>
            Menos
          </Button>
          <Button mode="contained-tonel" icon="plus" onPress={aumentar}>
            Mais
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
