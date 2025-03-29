import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Serie(props) {

    const {nome, ano, diretor, temporadas, capa } = props
   
  return (
    <View style={styles.container}>
      <Text>Atleta </Text>
      <Text>Nome {nome}</Text>
      <Text>Ano {ano}</Text>
      <Text>Diretor:  {diretor}</Text>
      <Text>Temporadas: {temporadas}</Text>
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