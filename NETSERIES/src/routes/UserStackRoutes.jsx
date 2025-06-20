import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
// Importa a sua barra de navegação personalizada
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';

const Stack = createNativeStackNavigator();

export default function UserStackRoutes() {
  return (
    <Stack.Navigator
      // O Stack agora renderiza a sua barra de navegação
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      <Stack.Screen 
        name="UserListPrincipal" 
        component={UserListScreen}
        // MUDANÇA: Adicionamos uma nova opção para controlar a visibilidade da busca
        options={{ 
          title: 'Lista de Usuários',
          showSearch: false, // Dizemos ao cabeçalho para NÃO mostrar a busca
        }} 
      />
      {/* Futuramente, aqui poderá adicionar as telas de Adicionar/Editar Usuário */}
    </Stack.Navigator>
  );
}
