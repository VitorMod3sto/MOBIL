import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useSettings } from '../contexts/SettingsContext';

export default function ConfigScreen() {
  const { isDarkMode, toggleTheme } = useSettings();
  const theme = useTheme();

  // Estados locais para controlos não funcionais
  const [volume, setVolume] = useState(50);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Modo Escuro */}
      <List.Item
        title="Modo Escuro"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="theme-light-dark" color={theme.colors.text} />}
        right={() => (
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: theme.dark ? theme.colors.primary : 'black' }}
            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
          />
        )}
      />
      <Divider />

      {/* Volume */}
      <List.Item
        title="Volume"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="volume-high" color={theme.colors.text} />}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={volume}
        onValueChange={setVolume}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor="#a0a0a0"
        thumbTintColor={theme.colors.primary}
      />
      <Divider />

      {/* Idioma */}
      <List.Item
        title="Idioma"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="translate" color={theme.colors.text} />}
      />
      <Divider />

      {/* Avaliar o App */}
      <Button
        icon="star-outline"
        mode="contained"
        onPress={() => console.log('Avaliar o App')}
        style={styles.button}
        buttonColor="#FFC107" 
        textColor="#000000"
        // MUDANÇA: Adiciona o estilo para o texto do botão
        labelStyle={{ fontWeight: 'bold' }}
      >
        Avaliar o App
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  slider: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
  button: {
    marginHorizontal: 4,
    marginTop: 30,
  }
});
