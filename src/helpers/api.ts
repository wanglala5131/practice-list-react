import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const baseURL = 'https://practice-list.herokuapp.com/api/practice';
const baseURL = 'http://localhost:4000/api/practice';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    } // 消除 ts 錯誤

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
  if (res.data) {
    return res.data;
  } else {
    return res;
  }
});

export default axiosInstance;
