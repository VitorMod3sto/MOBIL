import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeriesScreen from '../screens/SeriesScreen';
// Reutilizamos as telas de detalhe já existentes
import SerieDetalheScreen from '../screens/SerieDetalheScreen';
import EpisodioDetalheScreen from '../screens/EpisodioDetalheScreen';
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';
import SeriesGenreDetailScreen from '../screens/SeriesGenreDetailScreen';

const Stack = createNativeStackNavigator();

export default function SeriesStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      <Stack.Screen 
        name="SeriesPrincipal" 
        component={SeriesScreen}
        options={{ title: 'Séries' }} 
      />

      {/* 2. Regista a nova tela de detalhes de género */}
      <Stack.Screen 
        name="SeriesGenreDetail" 
        component={SeriesGenreDetailScreen}
        options={({ route }) => ({ title: route.params?.genreName || 'Género' })}
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
