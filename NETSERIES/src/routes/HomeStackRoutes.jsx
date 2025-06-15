import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa todas as telas da pilha e a barra de navegação
import TelaDeInicio from '../screens/HomeScreen';
import FilmeDetalheScreen from '../screens/FilmeDetalheScreen';
import SerieDetalheScreen from '../screens/SerieDetalheScreen';
import EpisodioDetalheScreen from '../screens/EpisodioDetalheScreen';
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';

const Stack = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator
      // O Stack agora é o responsável por renderizar o seu cabeçalho personalizado
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      {/* Definimos o título para cada tela, que será usado pela Appbar */}
      <Stack.Screen 
        name="HomePrincipal" 
        component={TelaDeInicio}
        options={{ title: 'Início' }} 
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
      {/* CORREÇÃO: Registramos a tela de detalhes do episódio aqui */}
       <Stack.Screen 
        name="EpisodioDetalhe" 
        component={EpisodioDetalheScreen}
        options={{ title: 'Detalhes do Episódio' }}
      />
    </Stack.Navigator>
  );
}
