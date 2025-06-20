import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, useTheme, Avatar } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
// O AsyncStorage não é mais necessário aqui, pois a lógica foi para o AuthContext
import { useAuth } from '../contexts/AuthContext';

export default function ContaScreen() {
  const theme = useTheme();
  // 1. Usamos a nova função 'atualizarUsuario' do contexto
  const { usuario, atualizarUsuario } = useAuth(); 

  // Estados para os campos do formulário (sem alteração)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [fotoUri, setFotoUri] = useState(null);

  // Efeito para preencher os dados (sem alteração)
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
      ...usuario,
      nome,
      email: email.trim().toLowerCase(),
      telefone,
      dataNascimento,
      senha,
      fotoUri,
    };
    

    const resultado = await atualizarUsuario(novosDados);

    if (resultado.success) {
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } else {
      Alert.alert('Erro ao Salvar', resultado.message);
    }
  };


  // A função para escolher a foto deve ser esta:
  const escolherFoto = async () => {
    // 1. Pede permissão para o usuário acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso às fotos para alterar a imagem de perfil.');
      return; // Para a execução se não houver permissão
    }

    // 2. Abre a galeria de imagens do dispositivo
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Permite apenas a seleção de imagens
      allowsEditing: true, // Permite que o usuário corte a imagem
      quality: 1, // Usa a qualidade máxima
    });

    // 3. Se o usuário selecionou uma imagem (não cancelou)
    if (!resultado.canceled) {
      // Atualiza o estado 'fotoUri' com o caminho da imagem selecionada
      setFotoUri(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* O JSX do formulário (sem alteração) */}
      <TouchableOpacity onPress={escolherFoto} style={styles.avatarContainer}>
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={styles.avatar} />
        ) : (
          <Avatar.Icon size={100} icon="camera" style={{backgroundColor: theme.colors.surfaceVariant}} />
        )}
        <Text style={{ marginTop: 8, color: theme.colors.text }}>Alterar foto</Text>
      </TouchableOpacity>

      <TextInput label="Nome" mode="outlined" value={nome} onChangeText={setNome} style={styles.input} />
<TextInput label="E-mail" mode="outlined" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput label="Telefone" mode="outlined" value={telefone} keyboardType="phone-pad"
        onChangeText={setTelefone}
        render={(props) => (
          <TextInputMask {...props} type="cel-phone" options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}/>
        )}
        style={styles.input}
      />
      <TextInput label="Data de nascimento" mode="outlined" value={dataNascimento} keyboardType="numeric"
        onChangeText={setDataNascimento}
        render={(props) => (<TextInputMask {...props} type="datetime" options={{ format: 'DD/MM/YYYY' }}/>
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
  avatar: { width: 100, height: 100, borderRadius: 50 },
  input: { width: '100%', marginBottom: 12 },
  botao: { marginTop: 10, width: '100%', paddingVertical: 4 },
});