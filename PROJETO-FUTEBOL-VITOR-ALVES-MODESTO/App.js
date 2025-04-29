import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CopaScreen from './screens/CopaScreen';
import EstadioScreen from './screens/EstadioScreen';
import BrasilScreen from './screens/BrasilScreen';
import EstatisticaScreen from './screens/EstatisticasScreen';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen
            name="Copa 2022"
            component={CopaScreen}
            options={{
              title: "Copa 2022",
              headerStyle: {
                backgroundColor: "#FFD700"
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: '#FFD700',
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: "#333",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="trophy" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Estadio Screen"
            component={EstadioScreen}
            options={{
              title: "Estádios",
              headerStyle: {
                backgroundColor: "#FFD700"
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: '#FFD700',
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: "#333",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map"
                 color={color} size={size} />
              ),
            }}

          />

          <Tab.Screen
            name="Brasil Screen"
            component={BrasilScreen}
            options={{
              title: "Brasil",
              headerStyle: {
                backgroundColor: "#FFD700"
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: '#FFD700',
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: "#333",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="flag" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Estatistica Screen"
            component={EstatisticaScreen}
            options={{
              title: "Estatísticas",
              headerStyle: {
                backgroundColor: "#FFD700"
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: '#FFD700',
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: "#333",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="information" color={color} size={size} />
              ),
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}


