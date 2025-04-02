import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Serie from './componentes/Serie';
import Filme from './componentes/Filme';

export default function App() {
  const listaFilme = [
    {
      nome: "Tropa de Elite",
      ano: 2007,
      diretor: "Jose  Padilha",
      tipo: "Drama/Policial",
      capa: "https://m.media-amazon.com/images/M/MV5BZTE1ZTlhNWEtNTAwMi00MmUzLTk3MGEtZjJiYjc3NTc0ZTc1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
      nome: "Até o Último Homem",
      ano: 2016,
      diretor: "Mel Gibson",
      tipo: "Drama",
      capa: "https://br.web.img3.acsta.net/pictures/16/11/21/15/29/457312.jpg"
    },
    {
      nome: "Vingadores Guerra Infinita",
      ano: 2019,
      diretor: "	Anthony Russo",
      tipo: "Acão/Ficção",
      capa: "https://m.media-amazon.com/images/M/MV5BZjg0NDMxZWItODc4ZC00YjM4LWJmNmYtNjlmZTE5NTEwNzEzXkEyXkFqcGc@._V1_.jpg"
    },
    {
      nome: "Até o Último Homem",
      ano: 2015,
      diretor: "Pete Docter",
      tipo: "Animação",
      capa: "https://br.web.img3.acsta.net/pictures/15/05/14/14/20/365361.jpg"
    },
    
  ];

  const listaSerie = [
    {
      nome: "The Walking Dead",
      ano: 2010,
      diretor: "Scott M. Gimple",
      temporadas: "11",
      capa: "https://upload.wikimedia.org/wikipedia/pt/d/df/The_Walking_Dead%2C_p%C3%B4ster_da_segunda_temporada.jpg"
    },
    {
      nome: "A Casa Do Dragão",
      ano: 2022,
      diretor: "Ryan Condal",
      temporadas: "2",
      capa: "https://m.media-amazon.com/images/I/81vj0n0mzGL._UF894,1000_QL80_.jpg"
    },
    {
      nome: "Peaky Blinders",
      ano: 2013,
      diretor: "Otto Bathurst",
      temporadas: "6",
      capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Cp-2tl7jePwD3zhBgJAAu_ZxGlTtXfzEkQ&s"
    },
    {
      nome: "Invencível",
      ano: 2022,
      diretor: "Vincent René-Lortie",
      temporadas: "3",
      capa: "https://pm1.aminoapps.com/8210/db8ff1f4ad33ab2e092561a1c72fa352d8f92ce9r1-861-1024v2_00.jpg"
    }
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.header}>
          <Text style={styles.logo}>V</Text>
          <Text style={styles.title}>Filmes e Séries</Text>
        </View>
        
        <Text style={styles.sessao}>Filmes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listaFilme.map(filme => (
            <Filme
              key={filme.nome}
              nome={filme.nome}
              ano={filme.ano}
              diretor={filme.diretor}
              tipo={filme.tipo}
              capa={filme.capa}
            />
          ))}
        </ScrollView>

        <Text style={styles.sessao}>Séries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listaSerie.map(serie => (
            <Serie
              key={serie.nome}
              nome={serie.nome}
              ano={serie.ano}
              diretor={serie.diretor}
              temporadas={serie.temporadas}
              capa={serie.capa}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 30
  },
  logo: {
    color: 'red',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 10
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  sessao: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginVertical: 10,
    paddingLeft: 10,
  },
  scrollView: {
    backgroundColor: '#000',
  },
});
