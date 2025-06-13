import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaDeInicio from '../screens/HomeScreen';
import FilmeDetalheScreen from '../screens/FilmeDetalheScreen';
import SerieDetalheScreen from '../screens/SerieDetalheScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator
      // Escondemos o cabeçalho padrão do Stack,
      // pois já temos o nosso cabeçalho personalizado do Drawer.
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePrincipal" component={TelaDeInicio} />
      <Stack.Screen name="FilmeDetalhe" component={FilmeDetalheScreen} />
      <Stack.Screen name="SerieDetalhe" component={SerieDetalheScreen} />
    </Stack.Navigator>
  );
}
