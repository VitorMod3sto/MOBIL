import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// 1. Importa o hook 'useTheme'
import { useTheme } from 'react-native-paper';
import HomeStackRoutes from './HomeStackRoutes';
import FilmesStackRoutes from './FilmesStackRoutes';
import SeriesStackRoutes from './SeriesStackRoutes';
import ConfigStackRoutes from './ConfigStackRoutes';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const theme = useTheme(); // 2. Pega o objeto do tema atual

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // 3. Aplica as cores do tema à barra de abas
        tabBarStyle: {
          backgroundColor: theme.colors.surface, // Cor de fundo da barra
          borderTopColor: theme.colors.outline,    // Cor da borda superior
        },
        tabBarActiveTintColor: theme.colors.primary, // Cor do ícone ativo (vermelho)
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled, // Cor do ícone inativo (cinza)
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackRoutes} 
        options={{
          tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)
        }} 
      />
      <Tab.Screen 
        name="Filmes" 
        component={FilmesStackRoutes} 
        options={{
          tabBarIcon: ({ color, size }) => (<Ionicons name="film-outline" color={color} size={size} />)
        }} 
      />
      <Tab.Screen 
        name="Séries" 
        component={SeriesStackRoutes} 
        options={{
          tabBarIcon: ({ color, size }) => (<Ionicons name="tv-outline" color={color} size={size} />)
        }}
      />
      <Tab.Screen 
        name="Configurações" 
        component={ConfigStackRoutes} 
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (<Ionicons name="settings-outline" color={color} size={size} />)
        }} 
      />
    </Tab.Navigator>
  );
}
