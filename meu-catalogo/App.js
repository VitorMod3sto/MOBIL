import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Serie from './componentes/Serie';
import Filme from './componentes/Filme';


export default function App() {

  const listaFilme=[
    {
      nome: "Tropa de Elite",
      ano: 2007,
      diretor:"Jose  Padilha",
      tipo: "Drama/Policial",
      capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlt4BnxVFums_pn3vsg5CUNGKG9GNHMYmlA&s"
    },
    {
      nome: "Até o Último Homem",
      ano: 2016,
      diretor:"Mel Gibson",
      tipo: "Drama",
      capa: "https://br.web.img3.acsta.net/pictures/16/11/21/15/29/457312.jpg"
    }
  ]

  const listaSerie=[
    {
      nome: "The Walking Dead",
      ano: 2010,
      diretor:"Scott M. Gimple",
      temporadas: "11",
      capa: "https://upload.wikimedia.org/wikipedia/pt/d/df/The_Walking_Dead%2C_p%C3%B4ster_da_segunda_temporada.jpg"
    }
  ]

  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{marginTop:60}}>Filmes</Text>
      {
        listaFilme.map(
          filme => {
            return(
            <Filme 
            nome={filme.nome}
            ano={filme.ano}
            diretor={filme.diretor}
            tipo={filme.tipo}
            capa={filme.capa}
            />
            )
          }
        )
      }

<Text style={{marginTop:60}}>Series</Text>
      {
        listaSerie.map(
          serie => {
            return(
            <Serie 
            nome={serie.nome}
            ano={serie.ano}
            diretor={serie.diretor}
            tipo={serie.temporadas}
            capa={serie.capa}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
