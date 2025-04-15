import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ElencoScreen from "./screens/ElencoScreen";
import PremiosScreen from "./screens/PremiosScreen";
import FilmeScreen from "./screens/FilmeScreen";
import { Ionicons } from "@expo/vector-icons";

// Armazena na variavel TAB a função de criar a navegação de abas
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Filme"
          component={FilmeScreen}

          // Abaixo fica as estilizações da Screen acima
          options={{
            title: "Inicio",
            // Titulo que aparece na parte de cima da tela e a cor de fundo
            headerStyle: {
              backgroundColor: "#ffff",
            },

            // Estilizações da barra de navegação inferior
            tabBarActiveTintColor: "orange",
            tabBarInactiveBackgroundColor: "black",
            // Ícone da opção na barra
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="film" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Elenco"
          component={ElencoScreen}
          options={{
            tabBarActiveTintColor: "orange",
            tabBarInactiveBackgroundColor: "black",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Premio"
          component={PremiosScreen}
          options={{
            tabBarActiveTintColor: "orange",
            tabBarInactiveBackgroundColor: "black",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
