import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {DrawerRoutes} from './DrawerRoutes'
import Usuario from  '../screens/usuario/Usuario'
import Endereco from  '../screens/usuario/Endereco'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </PaperProvider>
  )
}
