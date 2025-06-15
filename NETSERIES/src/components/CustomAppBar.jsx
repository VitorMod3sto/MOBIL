import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

// O componente agora também recebe a prop 'back' do navegador
export default function BarraDeNavegacaoPersonalizada({ navigation, route, options, back }) {
  const titulo = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={{ backgroundColor: '#1F262E' }}>
      {/* MUDANÇA: Lógica condicional para exibir o botão de Voltar ou o de Menu */}
      {back ? (
        // Se a propriedade 'back' existir (ou seja, se for uma tela interna da pilha), exibe o botão de voltar.
        <Appbar.BackAction color="#fff" onPress={navigation.goBack} />
      ) : (
        // Se não, exibe o ícone de menu para abrir a gaveta.
        <Appbar.Action
          icon="menu"
          color="#fff"
          onPress={() => navigation.openDrawer()}
        />
      )}
      
      <Appbar.Content title={titulo} titleStyle={{ color: '#fff', fontWeight: 'bold' }} />
      
      <Appbar.Action
        icon="magnify"
        color="#fff"
        onPress={() => {
          console.log('Clicou em Pesquisar!');
        }}
      />
    </Appbar.Header>
  );
}