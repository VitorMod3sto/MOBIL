import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Divider, PaperProvider, Provider, Text } from "react-native-paper";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function App() {
  const lista = ["Uva", "Pera", "Morango"];

  const lista2 = [
    {
      titulo: "titulo qualquer",
      descricao: "Vitin",
      imagem:
        "https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60",
    },
    {
      titulo: "titulo qualquer",
      descricao: "Vitin",
      imagem:
        "https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60",
    },
    {
      titulo: "titulo qualquer",
      descricao: "Vitin",
      imagem:
        "https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60",
    },
  ];
  return (
    <ScrollView>
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <FlatList
          horizontal
          data={lista2}
          renderItem={({ item }) => (
            <Card.Content>
              <Title>{item.titulo}</Title>
              <Paragraph>{item.descricao}</Paragraph>
              <Card.Cover
                source={{
                  uri: "https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60",
                }}
              ></Card.Cover>
            </Card.Content>
          )}
        />

        <FlatList
          data={lista2}
          renderItem={({ item }) => (
            <Card.Content>
              <Title>{item.titulo}</Title>
              <Paragraph>{item.descricao}</Paragraph>
              <Card.Cover
                source={{
                  uri: "https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60",
                }}
              ></Card.Cover>
            </Card.Content>
          )}
        />

        <FlatList data={lista} renderItem={({ item }) => <Text>{item}</Text>} />

        <FlatList
          data={lista}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
              <Divider />
            </View>
          )}
        />
      </View>
    </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
