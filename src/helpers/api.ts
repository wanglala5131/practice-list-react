import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'https://practice-list.herokuapp.com/api/practice';
// const baseURL = 'http://localhost:4000/api/practice';
// const baseURL =
//   'http://practicelist-env.eba-mwkw8rr6.us-west-2.elasticbeanstalk.com/api/practice';

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

export default axiosInstance;
