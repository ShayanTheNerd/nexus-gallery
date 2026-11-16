import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

export { apiClient };
