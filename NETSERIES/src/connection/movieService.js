// src/services/movieService.js
import api from './api';

export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    return [];
  }
};

export const getPopularSeries = async () => {
  try {
    const response = await api.get('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries populares:', error);
    return [];
  }
};

export const getTopRated = async () => {
  try {
    const response = await api.get('/trending/all/week');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar melhor avaliados:', error);
    return [];
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await api.get('/movie/now_playing');
    // Pegamos apenas os 5 primeiros para o carrossel
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar filmes em cartaz:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    // Busca os detalhes completos de um filme específico
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
};

export const getMovieRecommendations = async (movieId) => {
  try {
    // Busca filmes recomendados com base em um filme específico
    const response = await api.get(`/movie/${movieId}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar recomendações:', error);
    return [];
  }
};


