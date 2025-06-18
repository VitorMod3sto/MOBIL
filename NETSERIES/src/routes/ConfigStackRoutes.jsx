import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from '../screens/ConfigScreen';
// Importa a sua barra de navegação personalizada
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';

const Stack = createNativeStackNavigator();

export default function ConfigStackRoutes() {
  return (
    <Stack.Navigator
      // O Stack agora renderiza a sua barra de navegação
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      <Stack.Screen 
        name="ConfiguracoesPrincipal" 
        component={ConfigScreen}
        // Define o título que aparecerá no cabeçalho
        options={{ title: 'Ajustes' }} 
      />
    </Stack.Navigator>
  );
}
