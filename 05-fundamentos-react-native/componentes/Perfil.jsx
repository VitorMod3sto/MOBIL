import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Perfil(props) {
    console.log(props)
    console.log(props.idade)


  return (
    <View style={styles.container}>
      <Text style={{fontSize:40}}>PERFIL</Text>
      <Text>{props.nome}</Text>
      <Text>{props.idade}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
      }
})