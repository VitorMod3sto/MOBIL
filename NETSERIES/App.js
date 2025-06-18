import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { SettingsProvider, useSettings } from './src/contexts/SettingsContext';
import { CacheProvider } from './src/contexts/CacheContext';

// CORREÇÃO: Temas combinados de forma segura para preservar todas as propriedades
const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: '#f0f0f7',
    card: '#ffffff',
    text: '#1c1c1c',
    primary: '#E50914',
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    background: '#14181C',
    card: '#1F262E',
    text: '#ffffff',
    primary: '#E50914',
  },
};


// Componente que lida com o tema
const AppContent = () => {
  const { isDarkMode } = useSettings();
  
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    // Passamos o mesmo tema combinado para ambos os provedores
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <DrawerRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
};


export default function App() {
  return (
    <SettingsProvider>
      <CacheProvider>
        <AppContent />
      </CacheProvider>
    </SettingsProvider>
  );
}
