import apiHelper from 'helpers/api';
import { LoginReq, RegisterReq } from 'api/request.type';
import {
  AxiosResponseCustom,
  LoginRes,
  RegisterRes,
  currentUserRes,
} from './response.type';

export const login = (data: LoginReq) => {
  return apiHelper({
    url: `/signin`,
    method: 'post',
    data: data,
  }).then((res: AxiosResponseCustom<LoginRes>) => res.data);
};

export const register = (data: RegisterReq) => {
  return apiHelper({
    url: `/signup`,
    method: 'post',
    data: data,
  }).then((res: AxiosResponseCustom<RegisterRes>) => res.data);
};

export const getCurrentUser = (token: string) => {
  return apiHelper({
    url: `/users/current`,
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res: AxiosResponseCustom<currentUserRes>) => res.data);
};
