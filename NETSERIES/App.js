import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useSettings, SettingsProvider } from './src/contexts/SettingsContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { CacheProvider } from './src/contexts/CacheContext';
import DrawerRoutes from './src/routes/DrawerRoutes';
import AuthNavigator from './src/routes/AuthNavigator';
import { ActivityIndicator, View } from 'react-native';

// Temas combinados
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

// Tela de carregamento inicial
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

// Conteúdo do App com base no login
function AppContent() {
  const { isDarkMode } = useSettings();
  const { usuario, carregando } = useAuth();

  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  if (carregando) return <LoadingScreen />;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {usuario ? <DrawerRoutes /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CacheProvider>
          <AppContent />
        </CacheProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
