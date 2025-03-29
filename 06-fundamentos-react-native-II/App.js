import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Atleta from "./componentes/Atleta";

export default function App() {


  const listaJogadores = [
    {
      nome: "Neymar",
      idade: 33,
      imagem: 'https://i.pinimg.com/236x/65/92/d2/6592d22f05d29398784337cd02a37e26.jpg'
    },
    {
      nome: "Cristiano Ronaldo",
      idade: 40,
      imagem: 'https://i.pinimg.com/474x/e2/07/cc/e207cc58c891798d5ff308b38ebc59cc.jpg'
    },
    {
      nome: "Messi",
      idade: 40,
      imagem: 'https://i.pinimg.com/474x/ab/3b/73/ab3b732b4401d1820418db53ef468cd0.jpg'
    },
    {
      nome: "Messi",
      idade: 40,
      imagem: 'https://i.pinimg.com/474x/ab/3b/73/ab3b732b4401d1820418db53ef468cd0.jpg'
    },
    {
      nome: "Messi",
      idade: 40,
      imagem: 'https://i.pinimg.com/474x/ab/3b/73/ab3b732b4401d1820418db53ef468cd0.jpg'
    }
  ]


  return (
    <ScrollView>

    <View style={styles.container}>
      <StatusBar style="auto" />

      { listaJogadores.map(
        jogador => {
          return(
     <Atleta
     nome={jogador.nome}
     idade={jogador.idade}
     imagem={jogador.imagem}
     />
          )
        }
      )
      }


    </View>


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
