import { AxiosRequestConfig } from 'axios';

export interface AxiosResponseCustom<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface LoginRes {
  status: string;
  token: string;
  user: { id: number; name: string; email: string };
}

export interface RegisterRes {
  status: string;
  message?: string;
}
