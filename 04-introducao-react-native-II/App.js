// Imports
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View, ScrollView } from 'react-native';

// Função que representa o componente
export default function App() {

  // Lógica do código
const name = "Vitor"
function alerta(){
  alert("Salve")
}

{/*    comentário em JavaScript       */}
  // Retorna o que for renderizado na tela (feito com template JSX)
  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />

       {/* colocando propriedade inline  */ }
      <Text style={{fontSize:40, fontStyle:'italic', marginTop:38}}>Hello</Text>
      <Text>World</Text>
      <Button title='Clica aí mano' onPress={alerta}></Button>

      <Image
            source={{
              uri:"https://i.pinimg.com/originals/50/5d/5f/505d5f99390a5ad7b1faebd8b10d44b2.jpg"
            }}
      
            style={{
              height:300,
              width:300,
            }}
            />

          <Image
            source={require('./imagens/imagem.jpg')}
      
            style={{
               marginBottom:50,
              height:300,
              width:300,
            }}
            />

        <Image
            source={require('./imagens/imagem.jpg')}
      
            style={{
              marginBottom:50,
              height:300,
              width:300,
            }}
            />
            

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  // criando propriedade
  textoGrande: {
    fontSize:40,
    fontWeight:900
  }
});
