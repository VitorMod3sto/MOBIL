import React from 'react';
// 1. Importamos o hook 'useTheme'
import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function BarraDeNavegacaoPersonalizada({ navigation, route, options, back }) {
  const titulo = getHeaderTitle(options, route.name);
  const theme = useTheme(); // 2. Pega o objeto do tema atual

  return (
    // 3. O fundo do cabeçalho agora usa a cor 'surface' do tema
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }} elevated>
      {back ? (
        // O ícone e o texto agora usarão a cor principal do tema
        <Appbar.BackAction color={theme.colors.text} onPress={navigation.goBack} />
      ) : (
        <Appbar.Action
          icon="menu"
          color={theme.colors.text}
          onPress={() => navigation.openDrawer()}
        />
      )}
      
      <Appbar.Content title={titulo} titleStyle={{ color: theme.colors.text, fontWeight: 'bold' }} />
      
       {/* MUDANÇA: O ícone de busca só é renderizado se 'options.showSearch' não for 'false' */}
      {options.showSearch !== false && (
        <Appbar.Action
           icon="magnify"
  color={theme.colors.text}
  onPress={() => {
    navigation.navigate('Search');  // Navega para a tela Search
  }}
/>

      )}

    </Appbar.Header>
  );
}
