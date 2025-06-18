import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Cria o Contexto
export const SettingsContext = createContext();

// 2. Cria o Provedor que vai gerir os dados
export function SettingsProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Começa com o tema escuro como padrão

  // Quando o aplicativo carrega, busca as preferências guardadas
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));
        }
      } catch (e) {
        console.error("Erro ao carregar as configurações", e);
      }
    };
    loadSettings();
  }, []);

  // Função para alternar o tema e guardá-lo no dispositivo
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (e) {
      console.error("Erro ao guardar o tema", e);
    }
  };

  // Os valores que o nosso contexto vai fornecer para o resto do app
  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

// 3. Cria um Hook personalizado para usar o contexto mais facilmente
export function useSettings() {
  return useContext(SettingsContext);
}
