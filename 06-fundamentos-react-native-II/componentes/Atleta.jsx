import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Atleta(props) {

    const {nome, idade, imagem } = props
    console.log(props)
  return (
    <View style={styles.container}>
      <Text>Atleta </Text>
      <Text>Nome {nome}</Text>
      <Text>Idade: {idade}</Text>
      <Image
              source={{ uri:imagem }}
              style={{
                height: 200,
                width: 200
              }}
      
            />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"yellow",
        borderWidth:10,
        padding:10,
        alignItems: 'center',
        justifyContent:'center',
        flex:1
    },
    texto: {
        fontSize:20,
    }
})