import { StyleSheet, View } from 'react-native'
import { Text, Card, Title, Paragraph } from 'react-native-paper'
import React from 'react'


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant='headlineLarge' style={{textAlign:'center'}}>Tela de Inicio</Text>

      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
      </Card>

      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
      </Card>
      
      <Card style={{width:'90%'}}>
        <Card.Content>
            <Title> Titulo</Title>
            <Paragraph>Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto Um Texto </Paragraph>
        </Card.Content>
      </Card>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1,
        alignItems: 'center',
        paddingTop:10
    }
})