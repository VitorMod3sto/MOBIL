import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Telas do time
import EscudoScreen from './screens/EscudoScreen';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'orange' },
            tabBarActiveTintColor: 'orange',
            tabBarInactiveBackgroundColor: 'black',
            tabBarStyle: { backgroundColor: 'black' },
          }}
        >
          <Tab.Screen
            name="Escudo"
            component={EscudoScreen}
            options={{
              title: 'Escudo',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="image" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Jogadores"
            component={JogadoresScreen}
            options={{
              title: 'Jogadores',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Titulos"
            component={TitulosScreen}
            options={{
              title: 'Títulos',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="trophy" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
