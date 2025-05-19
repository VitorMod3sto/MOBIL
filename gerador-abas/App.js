import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JogoDoBichoScreen from './screens/JogoDoBichoScreen'
import MegaSenaScreen from './screens/MegaSenaScreen'
import { Ionicons } from "@expo/vector-icons";



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="JogoDoBichoScreen"
            component={JogoDoBichoScreen}
            options={{
              title: "Jogo do Bicho",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bug" color={color} size={size} />
              ),
            }}
          /> 
          <Tab.Screen
            name="MegaSenaScreen"
            component={MegaSenaScreen}
          /> 
          
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
