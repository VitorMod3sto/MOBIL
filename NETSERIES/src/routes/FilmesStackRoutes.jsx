import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilmesScreen from '../screens/FilmesScreen';
import FilmeDetalheScreen from '../screens/FilmeDetalheScreen';
import SerieDetalheScreen from '../screens/SerieDetalheScreen';
import EpisodioDetalheScreen from '../screens/EpisodioDetalheScreen';
// 1. Importa a sua barra de navegação personalizada
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';
import GenreDetailScreen from '../screens/GenreDetailScreen';

const Stack = createNativeStackNavigator();

export default function FilmesStackRoutes() {
  return (
    <Stack.Navigator
      // 2. O Stack agora renderiza o seu cabeçalho, assim como o HomeStack
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >

 
        
      <Stack.Screen 
        name="FilmesPrincipal" 
        component={FilmesScreen}
        // 3. Define o título para a tela principal da aba
        options={{ title: 'Filmes' }} 
      />

      {/* 2. Regista a nova tela */}
      <Stack.Screen 
        name="GenreDetail" 
        component={GenreDetailScreen}
        // O título do cabeçalho será o nome do género que passamos como parâmetro
        options={({ route }) => ({ title: route.params?.genreName || 'Gênero' })}
      />

      
      <Stack.Screen 
        name="FilmeDetalhe" 
        component={FilmeDetalheScreen}
        options={{ title: 'Detalhes do Filme' }}
      />
      <Stack.Screen 
        name="SerieDetalhe" 
        component={SerieDetalheScreen}
        options={{ title: 'Detalhes da Série' }}
      />
      <Stack.Screen 
        name="EpisodioDetalhe" 
        component={EpisodioDetalheScreen}
        options={{ title: 'Detalhes do Episódio' }}
      />
    </Stack.Navigator>
  );
}
