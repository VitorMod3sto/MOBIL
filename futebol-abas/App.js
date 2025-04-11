import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Telas do time
import EscudoScreen from './screens/EscudoScreen';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';

// Tema personalizado do Flamengo
const FlamengoTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E11B22',       // vermelho Flamengo
    background: '#000000',    // fundo preto
    text: '#FFFFFF',          // texto branco
    surface: '#1C1C1C',       // superfície escura
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={FlamengoTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#E11B22' },
            headerTintColor: 'white',
            tabBarActiveTintColor: '#E11B22',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: { backgroundColor: 'black' },
            tabBarInactiveBackgroundColor: 'black',
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
