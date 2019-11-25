import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.bambee.tech/',
  timeout: 5000,
});

API.defaults.headers.post['Content-Type'] = 'application/json';

export default API
