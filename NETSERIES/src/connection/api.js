import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '9267ea29e1abb0076def6134615a1a68', 
    language: 'pt-BR',
  },
});

export default api;
