import { StatusBar } from 'expo-status-bar';
import { Button, Image , StyleSheet ,Text ,View , ScrollView, } from 'react-native';

export default function App() {

    // Lógica do código
function alerta(){
  alert("TRAIIIUUU! DIGO... GOOOL! O SEU SONHO ESTÁ REALIZADO MENINOO!")
}
  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />


      <Text style={{marginBottom:"20", marginTop:60, fontSize:30}}>NEYMAR</Text>
      <Text style={{marginBottom:"10"}}>NOME: NEYMAR DA SILVA JUNIOR</Text>
      <Text style={{marginBottom:"10"}}>IDADE: 33 ANOS</Text>
      <Text style={{marginBottom:"10"}}>TRAIÇÕES: INFINITAS</Text>
      <Text style={{marginBottom:"10"}}>ALTURA: 1,77</Text>

      <Button title='GOL?' onPress={alerta}></Button>



      <Image
            source={{
              uri:"https://inteligenciafinanceira.com.br/wp-content/uploads/2022/08/cropped-atacante-neymar-brasil-psg.jpg"
            }}
      
            style={{
              marginBottom:"10",
              height:300,
              width:300,
            }}
            />

            <Image
            source={{
              uri:"https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/neymar_comemora_gol-e1739751506319.jpg?w=1200&h=900&crop=1"
            }}
      
            style={{
              marginBottom:"10",
              height:300,
              width:300,
            }}
            />

<Image
            source={{
              uri:"https://assets.goal.com/images/v3/blt1ef9300391c48a5b/GettyImages-1243553711.jpg?auto=webp&format=pjpg&width=3840&quality=60"
            }}
      
            style={{
              marginBottom:"10",
              height:300,
              width:300,
            }}
            />

<Image
            source={{
              uri:"https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/FX6D6DCAERLX7NJDPJM2B34ETI.jpg?auth=f8b727088f4136694a43d75fc0699400cb9377861858222360e150d6c8f4374e&width=1200&height=600"
            }}
      
            style={{
              marginBottom:"10",
              height:300,
              width:300,
            }}
            />

<Image
            source={{
              uri:"https://s2-ge.glbimg.com/IuvdFFqMmkGQKH_oEHT6qg-Tbt0=/0x0:1080x981/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/G/A/rKvezgRiy5pzVRKs8dBA/neymar-comemora-gol-fazendo-gesto-de-silencio-1575508862463-v2-1080x981.jpg"
            }}
      
            style={{
              marginBottom:"10",
              height:300,
              width:300,
            }}
            />

<Image
            source={{
              uri:"https://i.pinimg.com/736x/e6/d1/09/e6d109226e99e626f9121a7234faef6e.jpg"
            }}
      
            style={{
              marginBottom:"10",
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
    justifyContent: 'center',
  },
});
