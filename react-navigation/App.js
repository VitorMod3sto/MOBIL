import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Inicio",
              headerStyle: {
                backgroundColor: "orange",
              },
              tabBarActiveTintColor: "orange",
              tabBarInactiveBackgroundColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: "Profile",
              tabBarActiveTintColor: "orange",
              tabBarInactiveBackgroundColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              title: "Settings",
              headerStyle: {
                backgroundColor: "orange",
              },
              tabBarActiveTintColor: "orange",
              tabBarInactiveBackgroundColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
