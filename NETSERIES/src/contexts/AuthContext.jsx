import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
  // Função para carregar o usuário logado e criar o 'admin' na inicialização
  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioLogado = await AsyncStorage.getItem('@usuarioLogado');
      if (usuarioLogado) setUsuario(JSON.parse(usuarioLogado));

      const usuarios = await AsyncStorage.getItem('@usuarios');
      let lista = usuarios ? JSON.parse(usuarios) : [];

      const jaTemAdmin = lista.some(u => u.email === 'admin');
      if (!jaTemAdmin) {
        const admin = {
          id: new Date().getTime(),
          nome: 'Administrador',
          email: 'admin',
          senha: 'admin',
          telefone: '',
          dataNascimento: '',
        };
        lista.push(admin);
        await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
      }

      setCarregando(false);
    };
    carregarUsuario();
  }, []);

  // Função para registrar um novo usuário
  const registrar = async (novoUsuario) => {
    const usuariosSalvos = await AsyncStorage.getItem('@usuarios');
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    if (lista.find(u => u.email === novoUsuario.email)) return false;

    novoUsuario.id = new Date().getTime();
    lista.push(novoUsuario);
    await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
    await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
    return true;
  };

  // Função para fazer o login de um usuário existente
  const login = async (email, senha) => {
    const usuariosSalvos = await AsyncStorage.getItem('@usuarios');
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
    const achado = lista.find(u => u.email === email && u.senha === senha);
    if (achado) {
      setUsuario(achado);
      await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(achado));
      return true;
    }
    return false;
  };

  // Função para atualizar os dados de um usuário (incluindo o e-mail)
  const atualizarUsuario = async (novosDados) => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem('@usuarios');
      let listaDeUsuarios = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

      // Verificação para garantir que o novo e-mail não está em uso por outra conta
      const emailJaExiste = listaDeUsuarios.find(
        u => u.email === novosDados.email && u.id !== novosDados.id
      );

      if (emailJaExiste) {
        return { success: false, message: 'Este e-mail já está em uso por outra conta.' };
      }

      // Encontra o usuário pelo ID para garantir que estamos atualizando a pessoa certa
      const indiceDoUsuario = listaDeUsuarios.findIndex(u => u.id === novosDados.id);

      if (indiceDoUsuario !== -1) {
        listaDeUsuarios[indiceDoUsuario] = novosDados;
        
        await AsyncStorage.setItem('@usuarios', JSON.stringify(listaDeUsuarios));
        await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(novosDados));

        setUsuario(novosDados);
        return { success: true };
      }
      
      return { success: false, message: 'Usuário não encontrado.' };
    } catch (e) {
      console.error("Erro ao atualizar usuário no contexto", e);
      return { success: false, message: 'Ocorreu um erro inesperado.' };
    }
  };

  // Função para fazer logout
  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('@usuarioLogado');
  };

  // O Provider que disponibiliza o estado e as funções para o resto do app
  return (
    <AuthContext.Provider value={{ usuario, carregando, registrar, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);