import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Divider, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function CustomDrawerContent(props) {
  const theme = useTheme();
  const { usuario, logout } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* Seção com informações do usuário */}
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
              
              {/* --- INÍCIO DA MUDANÇA --- */}
              {/* Verifica se existe uma fotoUri no objeto do usuário */}
              {usuario?.fotoUri ? (
                // Se existir, mostra a imagem que o usuário selecionou
                <Avatar.Image
                  source={{ uri: usuario.fotoUri }}
                  size={50}
                />
              ) : (
                // Se não existir, mostra um avatar com a inicial do nome do usuário
                <Avatar.Text
                  label={usuario?.nome ? usuario.nome[0].toUpperCase() : 'U'}
                  size={50}
                  style={{ backgroundColor: theme.colors.primary }} // Usa a cor primária do tema para o fundo
                />
              )}
              {/* --- FIM DA MUDANÇA --- */}

              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={[styles.title, { color: theme.colors.text }]}>
                  {usuario?.nome || 'Usuário'}
                </Title>
                <Caption style={[styles.caption, { color: theme.colors.onSurfaceVariant }]}>
                  @{usuario?.email || 'email'}
                </Caption>
              </View>
            </View>
          </View>

          {/* Itens de navegação */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="home-outline" color={theme.colors.text} size={size} />
              )}
              label="Início"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('InícioApp', { screen: 'Home' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="film-outline" color={theme.colors.text} size={size} />
              )}
              label="Filmes"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('InícioApp', { screen: 'Filmes' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="tv-outline" color={theme.colors.text} size={size} />
              )}
              label="Séries"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('InícioApp', { screen: 'Séries' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={theme.colors.text} size={size} />
              )}
              label="Ajustes"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('InícioApp', { screen: 'Configurações' })}
            />
          </Drawer.Section>

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          {/* Extras */}
          <Drawer.Section>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="person-outline" color={theme.colors.text} size={size} />
              )}
              label="Conta"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('Conta')}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="heart-outline" color={theme.colors.text} size={size} />
              )}
              label="Favoritos"
              labelStyle={{ color: theme.colors.text }}
              onPress={() => props.navigation.navigate('Favoritos')}
            />
          </Drawer.Section>

          {/* Se admin, mostra o menu "Ver usuários" */}
          {usuario?.email === 'admin' && (
            <>
              <Divider style={{ backgroundColor: theme.colors.outline }} />
              <Drawer.Section>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons name="people-outline" color={theme.colors.text} size={size} />
                  )}
                  label="Usuários"
                  labelStyle={{ color: theme.colors.text }}
                  onPress={() => { props.navigation.navigate('Usuarios') }}
                />
              </Drawer.Section>
            </>
          )}

          <Divider style={{ backgroundColor: theme.colors.outline, marginVertical: 10 }} />

          {/* 🚪 Botão de Logout */}
          <Drawer.Section>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="log-out-outline" color={theme.colors.text} size={size} />
              )}
              label="Sair"
              labelStyle={{ color: theme.colors.text }}
              onPress={logout}
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
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 5,
  }
});