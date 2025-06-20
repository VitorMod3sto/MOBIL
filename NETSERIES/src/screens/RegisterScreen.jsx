import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { registrar } = useAuth();
  const theme = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const handleRegistrar = async () => {
    const novosErros = {};

    if (!nome) novosErros.nome = 'Informe seu nome completo';
    if (!email) {
      novosErros.email = 'Informe seu e-mail';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        novosErros.email = 'E-mail inválido';
      }
    }
    if (!telefone) novosErros.telefone = 'Informe seu telefone';
    if (!dataNascimento) novosErros.dataNascimento = 'Informe sua data de nascimento';
    if (!senha) novosErros.senha = 'Crie uma senha';

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const novoUsuario = {
      nome,
      email: email.trim().toLowerCase(),
      telefone,
      dataNascimento,
      senha,
    };

    const sucesso = await registrar(novoUsuario);
    if (!sucesso) {
      setErros({ email: 'Já existe uma conta com este e-mail' });
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.logoTexto, { color: theme.colors.primary }]}>NETseries</Text>

        {/* Nome */}
        <TextInput
          label="Nome completo"
          mode="outlined"
          value={nome}
          onChangeText={(text) => { setNome(text); setErros(prev => ({ ...prev, nome: '' })); }}
          style={styles.input}
        />
        <Text style={styles.erro}>{erros.nome || ' '}</Text>

        {/* Email */}
        <TextInput
          label="E-mail"
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => { setEmail(text); setErros(prev => ({ ...prev, email: '' })); }}
          style={styles.input}
        />
        <Text style={styles.erro}>{erros.email || ' '}</Text>

        {/* Telefone */}
        <TextInput
          label="Telefone"
          mode="outlined"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(text) => { setTelefone(text); setErros(prev => ({ ...prev, telefone: '' })); }}
          render={(props) => (
            <TextInputMask
              {...props}
              type="cel-phone"
              options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }}
            />
          )}
          style={styles.input}
        />
        <Text style={styles.erro}>{erros.telefone || ' '}</Text>

        {/* Data de nascimento */}
        <TextInput
          label="Data de nascimento"
          mode="outlined"
          keyboardType="numeric"
          value={dataNascimento}
          onChangeText={(text) => { setDataNascimento(text); setErros(prev => ({ ...prev, dataNascimento: '' })); }}
          render={(props) => (
            <TextInputMask
              {...props}
              type="datetime"
              options={{ format: 'DD/MM/YYYY' }}
            />
          )}
          style={styles.input}
        />
        <Text style={styles.erro}>{erros.dataNascimento || ' '}</Text>

        {/* Senha */}
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={(text) => { setSenha(text); setErros(prev => ({ ...prev, senha: '' })); }}
          style={styles.input}
        />
        <Text style={styles.erro}>{erros.senha || ' '}</Text>

        {/* Botões */}
        <Button mode="contained" onPress={handleRegistrar} style={styles.botao}>
          Cadastrar
        </Button>

        <Button onPress={() => navigation.goBack()} style={styles.link}>
          Já tem uma conta? Entrar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoTexto: {
    fontSize: 48,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  erro: {
  color: 'red',
  fontSize: 13,
  marginTop: 4,        // antes era -12, agora dá espaçamento entre campo e erro
  marginBottom: 8,
  marginLeft: 4,
  minHeight: 18,       // mantém o layout fixo mesmo sem erro
},
  input: {
    marginBottom: 8,
  },
  botao: {
    marginTop: 8,
  },
  link: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
