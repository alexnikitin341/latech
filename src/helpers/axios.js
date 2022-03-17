import axios from 'axios';

const apiDomen = process.env.REACT_APP_API;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
  baseURL: `${apiDomen}api`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokenId');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  window.location.href = '/';
  return config;
});

export default instance;
