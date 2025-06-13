import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

// Componente da barra de navegação superior personalizada
export default function BarraDeNavegacaoPersonalizada({ navigation, route, options }) {
  // Pega o título da rota atual a partir das opções da tela
  const titulo = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={{ backgroundColor: '#1F262E' }}>
      {/* Ícone "menu" à esquerda que abre a gaveta lateral */}
      <Appbar.Action
        icon="menu"
        color="#fff"
        onPress={() => navigation.openDrawer()}
      />
      {/* Conteúdo principal, que exibe o título da página */}
      <Appbar.Content title={titulo} titleStyle={{ color: '#fff', fontWeight: 'bold' }} />
      {/* Ícone de busca "magnify" à direita */}
      <Appbar.Action
        icon="magnify"
        color="#fff"
        onPress={() => {
          console.log('Clicou em Pesquisar!');
          // A lógica de busca será implementada futuramente aqui
        }}
      />
    </Appbar.Header>
  );
}
