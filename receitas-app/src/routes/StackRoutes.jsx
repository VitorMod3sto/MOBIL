
import HomeScreen from "../screens/HomeScreen"
import ReceitaScreen from "../screens/ReceitaScreen"

import { createStackNavigator } from "@react-navigation/stack"


export default function StackRoutes() {
    
const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
    
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="ReceitaScreen" component={ReceitaScreen}/>      
    
       </Stack.Navigator>
  )
}
