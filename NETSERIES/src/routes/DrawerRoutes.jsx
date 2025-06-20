import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import CustomDrawerContent from '../components/CustomDrawerContent';
// 1. Importe a nova pilha de rotas da Conta
import ContaStackRoutes from './ContaStackRoutes'; 


// Telas de exemplo
import { View, Text, StyleSheet } from 'react-native';
import UserStackRoutes from './UserStackRoutes';

const ContaScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Tela da Conta</Text>
  </View>
);

const FavoritosScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Tela de Favoritos</Text>
  </View>
);

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="InícioApp" component={TabRoutes} />
      <Drawer.Screen name="Conta" component={ContaStackRoutes} />
      <Drawer.Screen name="Favoritos" component={FavoritosScreen} />

      {/* 2. Regista a nova pilha de utilizadores no navegador */}
            <Drawer.Screen name="Usuarios" component={UserStackRoutes} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14181C',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
