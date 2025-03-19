import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
 

// FUNÇÃO QUE DEFINE O COMPONENTE
// Retorna o que for renderizado na tela (feito com template JSX)
export default function App() {

  // LÓGICA DO COMPONENTE
const name = "Vitor"
function alerta(){
  alert("MENGÃO KRL")
}

  // RETORNO DO JSX
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
      source={{
        uri:"https://i.pinimg.com/originals/a6/ec/98/a6ec98df82ff4558d29a297ed9189811.jpg"
      }}

      style={{
        height:400,
        width:400,
      }}
      />

      <Text>DESCUBRA SEU TIME</Text>
      <Button title='?' onPress={alerta}></Button>

      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
