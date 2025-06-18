import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import { useSettings } from '../contexts/SettingsContext';

export default function ConfigScreen() {
  const { isDarkMode, toggleTheme } = useSettings();
  const theme = useTheme(); // Pega o tema atual para estilização

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Modo Escuro */}
      <List.Item
        title="Modo Escuro"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="theme-light-dark" color={theme.colors.text} />}
        right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
      />
      <Divider />

      {/* Outras opções (visuais por enquanto) */}
      <List.Item
        title="Volume"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="volume-high" color={theme.colors.text} />}
      />
       <Divider />
      <List.Item
        title="Idioma"
        titleStyle={{ color: theme.colors.text }}
        left={() => <List.Icon icon="translate" color={theme.colors.text} />}
      />
       <Divider />
      <Button
        icon="star-outline"
        mode="contained-tonal"
        onPress={() => console.log('Avaliar o App')}
        style={styles.button}
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
  },
  button: {
    margin: 20,
    marginTop: 30,
  }
});
