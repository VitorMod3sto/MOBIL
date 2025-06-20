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


// NOVA FUNÇÃO
export const getSeriesDetails = async (seriesId) => {
  try {
    const response = await api.get(`/tv/${seriesId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes da série:', error);
    return null;
  }
};

// NOVA FUNÇÃO
export const getSeriesRecommendations = async (seriesId) => {
  try {
    const response = await api.get(`/tv/${seriesId}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar recomendações de séries:', error);
    return [];
  }
};


// NOVA FUNÇÃO
export const getSeasonDetails = async (seriesId, seasonNumber) => {
  try {
    // Busca os detalhes de uma temporada específica, que contém a lista de episódios
    const response = await api.get(`/tv/${seriesId}/season/${seasonNumber}`);
    return response.data.episodes; // Retornamos o array de episódios
  } catch (error) {
    console.error(`Erro ao buscar detalhes da temporada ${seasonNumber}:`, error);
    return [];
  }
};

// NOVA FUNÇÃO
export const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    // A API retorna vários vídeos, procuramos o trailer oficial
    const trailer = response.data.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    // Retornamos apenas a chave do vídeo, ou null se não houver trailer
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Erro ao buscar vídeos do filme:', error);
    return null;
  }
};

// --- NOVAS FUNÇÕES ADICIONADAS ---

export const getSeriesVideos = async (seriesId) => {
  try {
    const response = await api.get(`/tv/${seriesId}/videos`);
    const trailer = response.data.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Erro ao buscar vídeos da série:', error);
    return null;
  }
};

export const getEpisodeVideos = async (seriesId, seasonNumber, episodeNumber) => {
    try {
      const response = await api.get(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`);
      const video = response.data.results.find(v => v.site === 'YouTube');
      return video ? video.key : null;
    } catch (error) {
      console.error('Erro ao buscar vídeos do episódio:', error);
      return null;
    }
  };


  // NOVA FUNÇÃO
export const getOnTheAirSeries = async () => {
  try {
    const response = await api.get('/tv/on_the_air');
    // Pegamos as 5 primeiras para o carrossel, para manter o padrão
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar séries no ar:', error);
    return [];
  }
};


// --- NOVAS FUNÇÕES ---

// NOVA FUNÇÃO
export const getMovieCertifications = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/release_dates`);
    // Procura nos resultados o que for específico para o Brasil ('BR')
    const resultsForBrazil = response.data.results.find(
      (result) => result.iso_3166_1 === "BR"
    );
    // Dentro dos resultados do Brasil, pegamos a certificação do primeiro item
    const certification = resultsForBrazil?.release_dates[0]?.certification;
    // Se não encontrar uma certificação específica, retorna 'L' de Livre
    return certification || 'L';
  } catch (error) {
    console.error('Erro ao buscar certificação do filme:', error);
    return 'L'; // Retorna 'L' em caso de erro
  }
};

export const getSeriesCertifications = async (seriesId) => {
  try {
    const response = await api.get(`/tv/${seriesId}/content_ratings`);
    // Procuramos nos resultados o que for específico para o Brasil ('BR')
    const ratingForBrazil = response.data.results.find(
      (result) => result.iso_3166_1 === "BR"
    );
    // Se não encontrar, retorna 'L' de Livre como padrão
    return ratingForBrazil?.rating || 'L';
  } catch (error) {
    console.error('Erro ao buscar classificação da série:', error);
    return 'L';
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get('/movie/top_rated');
    // Pegamos os 5 primeiros para o carrossel
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar filmes mais bem avaliados:', error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await api.get('/movie/upcoming');
    // Pegamos os 5 primeiros para o carrossel
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar próximos lançamentos:', error);
    return [];
  }
};

// NOVA FUNÇÃO
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc', // Ordena por popularidade para ter resultados relevantes
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar filmes do gênero ${genreId}:`, error);
    return [];
  }
};


// NOVA FUNÇÃO
export const getMovieGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres; // A API retorna um objeto com um array 'genres'
  } catch (error) {
    console.error('Erro ao buscar lista de géneros:', error);
    return [];
  }
};

// --- NOVAS FUNÇÕES PARA A TELA DE SÉRIES ---

export const getSeriesGenres = async () => {
  try {
    const response = await api.get('/genre/tv/list');
    return response.data.genres; // A API retorna um objeto com um array 'genres'
  } catch (error) {
    console.error('Erro ao buscar lista de géneros de séries:', error);
    return [];
  }
};

export const getSeriesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/tv', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar séries do gênero ${genreId}:`, error);
    return [];
  }
};

export async function searchMulti(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const response = await api.get('/search/multi', {
      params: {
        query,
        language: 'pt-BR',
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro na busca multi:', error);
    return [];
  }
}
