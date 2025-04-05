import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'

export default function Jogador(props) {
    const {nome, numero, imagem} = props
  return (
    <Card.Title
    title={nome}
    left={(props) => <Avatar.Image {...props} source={{uri: imagem}}/>}
  />
  )
}

const styles = StyleSheet.create({})