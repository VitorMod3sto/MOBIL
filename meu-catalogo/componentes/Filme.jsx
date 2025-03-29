import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Filme(props) {

    const {nome, ano, diretor, tipo, capa } = props
   
  return (
    <View style={styles.container}>
      <Text>Atleta </Text>
      <Text>Nome {nome}</Text>
      <Text>Ano {ano}</Text>
      <Text>Diretor:  {diretor}</Text>
      <Text>Tipo: {tipo}</Text>
      <Image
              source={{ uri: capa }}
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