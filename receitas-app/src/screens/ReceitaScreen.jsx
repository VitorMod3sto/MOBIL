import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card } from 'react-native-paper';

export default function ReceitaScreen({navigation, route}) {

    const receita = route.params.item;

  return (
    <View>
      <Card>
        <Card.Content>
            <Card.Cover source={{ uri: receita.imagem }} />
          <Text>Receita: {receita.nome}</Text>
          <Text>Tempo de Preparo: {receita.tempoPreparo}</Text>
          <Text>Porcoes: {receita.porcoes}</Text>
          <Text>Ingredientes: {receita.ingredientes}</Text>
          <Text>Modo de Preparo: {receita.modoPreparo}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained-tonal"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Receitas
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({})