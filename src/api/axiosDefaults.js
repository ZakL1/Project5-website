/*import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";*/

// api.js'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export default api;

export const setAuthorizationHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};