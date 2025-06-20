import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, useTheme, Avatar } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

export default function ContaScreen() {
  const theme = useTheme();
  const { usuario, setUsuario } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [fotoUri, setFotoUri] = useState(null);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setTelefone(usuario.telefone);
      setDataNascimento(usuario.dataNascimento);
      setSenha(usuario.senha);
      setFotoUri(usuario.fotoUri || null);
    }
  }, [usuario]);

  const handleSalvar = async () => {
    if (!nome || !email || !telefone || !dataNascimento || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novosDados = {
      nome,
      email,
      telefone,
      dataNascimento,
      senha,
      fotoUri,
    };

    // Atualiza na lista de usuários
    const dados = await AsyncStorage.getItem('@usuarios');
    let lista = dados ? JSON.parse(dados) : [];

    lista = lista.map(u => u.email === usuario.email ? novosDados : u);
    await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
    setUsuario(novosDados); // Atualiza no contexto

    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso às fotos.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setFotoUri(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={escolherFoto} style={styles.avatarContainer}>
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={styles.avatar} />
        ) : (
          <Avatar.Icon size={80} icon="camera" />
        )}
        <Text style={{ marginTop: 8 }}>Alterar foto</Text>
      </TouchableOpacity>

      <TextInput label="Nome" mode="outlined" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="E-mail" mode="outlined" value={email} disabled style={styles.input} />
      <TextInput label="Telefone" mode="outlined" value={telefone} keyboardType="phone-pad"
        onChangeText={setTelefone}
        render={(props) => (
          <TextInputMask
            {...props}
            type="cel-phone"
            options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }}
          />
        )}
        style={styles.input}
      />
      <TextInput label="Data de nascimento" mode="outlined" value={dataNascimento} keyboardType="numeric"
        onChangeText={setDataNascimento}
        render={(props) => (
          <TextInputMask
            {...props}
            type="datetime"
            options={{ format: 'DD/MM/YYYY' }}
          />
        )}
        style={styles.input}
      />
      <TextInput label="Senha" mode="outlined" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

      <Button mode="contained" onPress={handleSalvar} style={styles.botao}>
        Salvar Alterações
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee' },
  input: { width: '100%', marginBottom: 12 },
  botao: { marginTop: 10, width: '100%' },
});
