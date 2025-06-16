import React, { createContext, useState, useContext, useRef } from 'react';

// 1. Cria o Contexto que será o nosso "armazém"
const CacheContext = createContext();

// 2. Cria o Provedor do Contexto, que vai gerir o armazém
export function CacheProvider({ children }) {
  // Usamos useRef para o cache. Ele funciona como uma variável global
  // que não desaparece, mas que também não causa re-renderizações desnecessárias.
  const cache = useRef({}).current;

  // Esta é a função principal. Ela vai buscar os dados.
  const getCachedData = async (key, fetchFunction) => {
    // Primeiro, verifica se já temos os dados guardados no nosso armazém.
    if (cache[key]) {
      // Se tivermos, retorna os dados do armazém instantaneamente.
      console.log(`[Cache] HIT: Buscando '${key}' do cache.`);
      return cache[key];
    }

    // Se não tivermos, ela executa a função de busca na API.
    console.log(`[Cache] MISS: Buscando '${key}' da API.`);
    const newData = await fetchFunction();
    
    // Guarda os novos dados no nosso armazém para a próxima vez.
    cache[key] = newData;
    
    return newData;
  };

  // O "value" é o que os outros componentes poderão aceder
  const value = {
    getCachedData,
  };

  return (
    <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
  );
}

// 3. Cria um "atalho" (Hook personalizado) para usar o nosso armazém mais facilmente
export function useCache() {
  return useContext(CacheContext);
}
