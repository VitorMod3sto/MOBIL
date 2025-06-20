import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, List, IconButton, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

export default function UserListScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const { usuario: logado } = useAuth();
  const theme = useTheme(); // 👈 pega o tema atual

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    const dados = await AsyncStorage.getItem('@usuarios');
    const lista = dados ? JSON.parse(dados) : [];
    setUsuarios(lista);
  }

  const confirmarExclusao = (usuario) => {
    Alert.alert(
      'Excluir usuário',
      `Tem certeza que deseja excluir ${usuario.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirUsuario(usuario),
        },
      ]
    );
  };

  async function excluirUsuario(usuarioParaExcluir) {
    const novaLista = usuarios.filter(u => u.email !== usuarioParaExcluir.email);
    await AsyncStorage.setItem('@usuarios', JSON.stringify(novaLista));
    setUsuarios(novaLista);
  }

  const renderItem = ({ item }) => (
    <List.Item
      title={item.nome}
      description={item.email}
      titleStyle={{ color: theme.colors.text }} // aplica cor do tema
      descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
      right={() =>
        item.email !== 'admin' ? (
          <IconButton
            icon="delete"
            iconColor={theme.colors.error}
            onPress={() => confirmarExclusao(item)}
          />
        ) : null
      }
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.titulo, { color: theme.colors.primary }]}>
        Usuários Cadastrados
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.vazio, { color: theme.colors.onSurfaceVariant }]}>
            Nenhum usuário cadastrado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  vazio: { textAlign: 'center', marginTop: 20 },
});
