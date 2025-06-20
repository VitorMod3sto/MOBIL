import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritosScreen from '../screens/FavoritosScreen';
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';
// Importe as telas de detalhe para a navegação a partir daqui
import FilmeDetalheScreen from '../screens/FilmeDetalheScreen';
import SerieDetalheScreen from '../screens/SerieDetalheScreen';

const Stack = createNativeStackNavigator();

export default function FavoritosStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      <Stack.Screen 
        name="FavoritosPrincipal" 
        component={FavoritosScreen}
        options={{ title: 'Meus Favoritos', showSearch: false }} 
      />
      <Stack.Screen name="FilmeDetalhe" component={FilmeDetalheScreen} />
      <Stack.Screen name="SerieDetalhe" component={SerieDetalheScreen} />
    </Stack.Navigator>
  );
}