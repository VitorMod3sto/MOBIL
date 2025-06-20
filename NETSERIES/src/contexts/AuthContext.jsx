import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
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
          favoritos: [],
        };
        lista.push(admin);
        await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
      }
      setCarregando(false);
    };
    carregarUsuario();
  }, []);

  const registrar = async (novoUsuario) => {
    const usuariosSalvos = await AsyncStorage.getItem('@usuarios');
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
    if (lista.find(u => u.email === novoUsuario.email)) return false;
    novoUsuario.favoritos = [];
    novoUsuario.id = new Date().getTime();
    lista.push(novoUsuario);
    await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
    await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
    return true;
  };

  const login = async (email, senha) => {
    const usuariosSalvos = await AsyncStorage.getItem('@usuarios');
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
    const achado = lista.find(u => u.email === email && u.senha === senha);
    if (achado) {
      if (!achado.favoritos) {
        achado.favoritos = [];
        // --- LINHA CRÍTICA ADICIONADA ---
        // Salva a atualização (a lista de favoritos vazia) no AsyncStorage
        await atualizarUsuario(achado); 
      }
      setUsuario(achado);
      await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(achado));
      return true;
    }
    return false;
  };

  const atualizarUsuario = async (novosDados) => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem('@usuarios');
      let listaDeUsuarios = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];
      const emailJaExiste = listaDeUsuarios.find(u => u.email === novosDados.email && u.id !== novosDados.id);
      if (emailJaExiste) {
        return { success: false, message: 'Este e-mail já está em uso por outra conta.' };
      }
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

  const adicionarFavorito = async (item) => {
    if (!usuario || !usuario.favoritos || usuario.favoritos.some(fav => fav.id === item.id)) {
      return;
    }
    const novosFavoritos = [...usuario.favoritos, item];
    const novosDados = { ...usuario, favoritos: novosFavoritos };
    await atualizarUsuario(novosDados);
  };

  const removerFavorito = async (itemId) => {
    if (!usuario || !usuario.favoritos) {
      return;
    }
    const novosFavoritos = usuario.favoritos.filter(fav => fav.id !== itemId);
    const novosDados = { ...usuario, favoritos: novosFavoritos };
    await atualizarUsuario(novosDados);
  };

  const isFavorito = (itemId) => {
    if (!usuario || !usuario.favoritos) {
      return false;
    }
    return usuario.favoritos.some(fav => fav.id === itemId);
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('@usuarioLogado');
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      carregando, 
      registrar, 
      login, 
      logout, 
      atualizarUsuario,
      adicionarFavorito,
      removerFavorito,
      isFavorito
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);