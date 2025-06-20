import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Divider, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  const theme = useTheme(); 
  return (
     <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                {/* 4. Os textos agora usam as cores do tema */}
                <Title style={[styles.title, { color: theme.colors.text }]}>Usuário</Title>
                <Caption style={[styles.caption, { color: theme.colors.onSurfaceVariant }]}>@usuario_teste</Caption>
              </View>
            </View>
          </View>

          {/* Seção com os itens de navegação das abas */}
           <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="home-outline" color={theme.colors.text} size={size} />
              )}
              label="Início"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Home' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="film-outline" color={theme.colors.text} size={size} />
              )}
              label="Filmes"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Filmes' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="tv-outline" color={theme.colors.text} size={size} />
              )}
              label="Séries"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Séries' }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={theme.colors.text} size={size} />
              )}
              label="Ajustes"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => { props.navigation.navigate('InícioApp', { screen: 'Configurações' }) }}
            />
          </Drawer.Section>
          
          {/* Linha separadora */}
           <Divider style={{ backgroundColor: theme.colors.outline }} />

          {/* Seção com os novos itens */}
          <Drawer.Section>
  <DrawerItem
    icon={({ size }) => (
      <Ionicons name="person-outline" color={theme.colors.text} size={size} />
    )}
    label="Conta"
    labelStyle={{ color: theme.colors.text }}
    onPress={() => { props.navigation.navigate('Conta') }}
  />
  <DrawerItem
    icon={({ size }) => (
      <Ionicons name="heart-outline" color={theme.colors.text} size={size} />
    )}
    label="Favoritos"
    labelStyle={{ color: theme.colors.text }}
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
  }
});
