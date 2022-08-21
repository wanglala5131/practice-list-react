import apiHelper from 'helpers/api';
import { LoginReq, RegisterReq } from 'api/request.type';
import { AxiosResponseCustom, LoginRes, RegisterRes } from './response.type';

// get 範例
// export function test() {
//   return apiHelper({
//     url: `/test`,
//     method: 'get',
//   });
// }

export function login(data: LoginReq) {
  return apiHelper({
    url: `/signin`,
    method: 'post',
    data: data,
  }).then((res: AxiosResponseCustom<LoginRes>) => res.data);
}

export function register(data: RegisterReq) {
  return apiHelper({
    url: `/signup`,
    method: 'post',
    data: data,
  }).then((res: AxiosResponseCustom<RegisterRes>) => res.data);
}
