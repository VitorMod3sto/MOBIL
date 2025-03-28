import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function JavaScriptComponente() {
   
  const nome = "Vitor"
    const idade = 21

    function checkMaiorIdade(){
        if (idade >= 18){
            return ('Maior de idade')
        } else {
            return ('Menor de idade')
        }
    }

    function alerta(){
        alert("Clicou no botão")
    }

  return (
    <View style={styles.container}>
     <Text>JavaScriptComponente</Text>
           <Text>NOME: {nome}</Text>
           <Text>IDADE: {idade}</Text>
           <Text>É maior de idade?</Text>
           <Text>{checkMaiorIdade()}</Text>
           <Text>Check 18+: {idade >= 18 ? "18+" : "18-"}</Text>
           <Button title="Clicar" onPress={alerta}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "yellow"
  }
})