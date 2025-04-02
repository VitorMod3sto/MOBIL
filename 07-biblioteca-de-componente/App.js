import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Provider, Text } from "react-native-paper";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

     

        <Card>
          <Card.Content>
            <Title style={{ textAlign: "center", fontWeight:900 }}>Título</Title>
            <Paragraph style={{marginBottom:10, fontWeight: 600 }}> Descrição: NEYMAR NEYMAR NEYMAR NEYMAR NEY
               </Paragraph>
            <Button mode="contained" style={{fontWeight:900 }}>Clique Aqui</Button>
          </Card.Content>
        </Card>

        <Card style={{marginTop:10}} >
          <Card.Content>
            <Paragraph style={{marginBottom:10, fontWeight: 600}}>
            <Text variant="displayMedium">

              NEY NEY NEY NEY
              </Text>
              </Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://assets.goal.com/images/v3/blt9a8c3f531c89ae83/GOAL%20-%20Blank%20WEB%20-%20Facebook(1902).jpeg?auto=webp&format=pjpg&width=3840&quality=60' }}></Card.Cover>
        </Card>

        

      </View>
    </PaperProvider>
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
