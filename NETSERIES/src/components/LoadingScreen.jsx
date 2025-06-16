import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';

// O seu logo continua o mesmo
const AppLogo = () => (
  <Svg height="100" width="100" viewBox="0 0 24 24">
    <Path
      fill="#E50914"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
    />
  </Svg>
);

export default function LoadingScreen() {
  return (
    <View style={estilos.container}>
      <AppLogo />
      {/* MUDANÇA: Substituímos o ActivityIndicator e o Texto pela ProgressBar */}
      <ProgressBar 
        style={estilos.barraDeProgresso}
        indeterminate={true} // A barra fica a animar sem um progresso definido
        color="#E50914"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14181C',
  },
  barraDeProgresso: {
    marginTop: 20,
    width: 200, // Definimos uma largura para a barra
    height: 7,
    borderRadius: 5,
  },
});
