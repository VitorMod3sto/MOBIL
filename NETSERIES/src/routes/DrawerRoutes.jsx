import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabRoutes from './TabRoutes';
import CustomAppbar from '../components/CustomAppBar';
import CustomDrawerContent from '../components/CustomDrawerContent'; // 1. Importa o novo componente

const Drawer = createDrawerNavigator();

// Telas de exemplo para os novos itens. Crie arquivos para elas depois.
const ContaScreen = () => (<View style={styles.container}><Text style={styles.text}>Tela da Conta</Text></View>);
const FavoritosScreen = () => (<View style={styles.container}><Text style={styles.text}>Tela de Favoritos</Text></View>);

// Função para pegar o título do cabeçalho
const getHeaderTitle = (route) => {
    // Se a rota for uma das novas telas, usa o nome dela como título
    if (route.name === 'Conta' || route.name === 'Favoritos') {
        return route.name;
    }

    // Se não, pega o título da aba que está ativa
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
        case 'Home': return 'Início';
        case 'Filmes': return 'Filmes';
        case 'Séries': return 'Séries';
        case 'Configurações': return 'Ajustes';
        default: return 'Início';
    }
};

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            // 2. Define o nosso componente como o renderizador do menu
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={({ route }) => ({
                header: (props) => <CustomAppbar {...props} />,
                headerTitle: getHeaderTitle(route),
            })}
        >
            {/* A tela principal que contém as abas */}
            <Drawer.Screen name="InícioApp" component={TabRoutes} />
            
            {/* 3. Registra as novas telas no navegador */}
            <Drawer.Screen name="Conta" component={ContaScreen} />
            <Drawer.Screen name="Favoritos" component={FavoritosScreen} />
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
    }
});
