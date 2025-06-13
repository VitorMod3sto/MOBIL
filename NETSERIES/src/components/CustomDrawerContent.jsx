import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Divider, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* Seção com informações do usuário (Opcional) */}
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://placehold.co/50x50/E50914/FFFFFF?text=U'
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>Usuário</Title>
                <Caption style={styles.caption}>@usuario_teste</Caption>
              </View>
            </View>
          </View>

          {/* Seção com os itens de navegação das abas */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              )}
              label="Início"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Home' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="film-outline" color={color} size={size} />
              )}
              label="Filmes"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Filmes' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="tv-outline" color={color} size={size} />
              )}
              label="Séries"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Séries' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              label="Ajustes"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Configurações' }) }}
            />
          </Drawer.Section>
          
          {/* Linha separadora */}
          <Divider style={styles.divider} />

          {/* Seção com os novos itens */}
          <Drawer.Section>
             <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )}
              label="Conta"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('Conta') }}
            />
             <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="heart-outline" color={color} size={size} />
              )}
              label="Favoritos"
              labelStyle={styles.label}
              onPress={() => { props.navigation.navigate('Favoritos') }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#a0a0a0',
  },
  drawerSection: {
    marginTop: 5,
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: '#3a3a3a'
  },
  label: {
      color: '#fff',
      marginLeft: -16, // Alinha o texto com o ícone
  }
});
