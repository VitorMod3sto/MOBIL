import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContaScreen from '../screens/ContaScreen';
import BarraDeNavegacaoPersonalizada from '../components/CustomAppBar';

const Stack = createNativeStackNavigator();

export default function ContaStackRoutes() {
  return (
    <Stack.Navigator
      // Define que o cabeçalho para esta pilha será o seu componente personalizado
      screenOptions={{
        header: (props) => <BarraDeNavegacaoPersonalizada {...props} />,
      }}
    >
      <Stack.Screen 
        name="ContaPrincipal" 
        component={ContaScreen}
        // Define as opções para esta tela
        options={{ 
          title: 'Minha Conta',
          // Assim como na tela de usuários, não queremos o ícone de busca aqui
          showSearch: false, 
        }} 
      />
      {/* Aqui você poderia adicionar telas relacionadas à conta no futuro */}
    </Stack.Navigator>
  );
}