import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FilmesScreen from '../screens/FilmesScreen';
import SeriesScreen from '../screens/SeriesScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1F262E', // Cor de fundo da barra
          borderTopColor: '#1F262E',  // Cor da borda
        },
        tabBarActiveTintColor: '#fff', // Cor do ícone e texto ativos (branco)
        tabBarInactiveTintColor: '#8A95A6', // Cor do ícone e texto inativos (cinza)
      }}
    >

      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Filmes"
        component={FilmesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Séries"
        component={SeriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={ConfigScreen}
        options={{
          tabBarLabel: 'Ajustes', // Nome menor para a aba
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}