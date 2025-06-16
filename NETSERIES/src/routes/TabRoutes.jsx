import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackRoutes from './HomeStackRoutes';
import FilmesStackRoutes from './FilmesStackRoutes';
import SeriesStackRoutes from './SeriesStackRoutes';
import ConfigScreen from '../screens/ConfigScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1F262E',
          borderTopColor: '#1F262E',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8A95A6',
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
        component={ConfigScreen} 
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (<Ionicons name="settings-outline" color={color} size={size} />)
        }} 
      />
    </Tab.Navigator>
  );
}
