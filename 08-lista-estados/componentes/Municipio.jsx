import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function Municipio(props) {

    const {nome,numero, imagem} = props

  return (
      <Card.Title
    title={nome}
    subtitle={numero}
    left={(props) => <Avatar.Image {...props} source={{uri: imagem}}/>}
  />
  )
}

const styles = StyleSheet.create({})