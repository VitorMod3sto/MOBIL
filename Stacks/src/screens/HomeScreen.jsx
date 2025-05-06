import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'


export default function HomeScreen(props) {

  const {navigation, route} = props

  // Serve para navegar entre as telas
  console.log("navigation =>", navigation)

  // Pegar os parametros e dados da rota
  console.log("route => ", route)

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button mode='contained'
      onPress={() => navigation.push("ProfileScreen")}> 
      Ir para tela de Profile
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({})