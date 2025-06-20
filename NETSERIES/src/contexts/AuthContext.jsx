import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem('@usuarioLogado');
      if (dados) setUsuario(JSON.parse(dados));
      setCarregando(false);
    };
    carregarUsuario();
  }, []);

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

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('@usuarioLogado');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
