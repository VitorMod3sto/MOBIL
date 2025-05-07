import { StyleSheet, Text, View, FlatList} from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function ListaScreen({ navigation, route }) {
    // passo as propriedades navigation e route
    // Crio a lista
  const carros = [
    {
      nome: "Marea",
      ano: "2001",
      cor: "Preto",
      fabricante: "Fiat",
    },
    {
      nome: "Uno",
      ano: "1998",
      cor: "Verde",
      fabricante: "Fiat",
    },
    {
      nome: "Stilo",
      ano: "2001",
      cor: "Amarelo",
      fabricante: "Fiat",
    },
    {
      nome: "Golf",
      ano: "2003",
      cor: "Cinza",
      fabricante: "Volkswagen",
    },
    {
      nome: "Civic",
      ano: "2017",
      cor: "Cinza",
      fabricante: "Honda",
    },
  ];

  return (
    <View>
      <FlatList
        data={carros}
        // lista importada aqui
        renderItem={({ item }) => (
            // defino que cada carro renderizado e que irá exibir a lista toda, item por item
            // Crio um Card de exibição e na função onPress, defino que irá para página ItemScreen
            // E irá repassar o item todo (objeto)
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Text>Carro: {item.nome}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
              mode="contained"
              icon='arrow-right'
              onPress={() => navigation.navigate('ItemScreen', {item})}
              >Ver Carro</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
