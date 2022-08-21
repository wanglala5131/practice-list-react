import apiHelper from 'helpers/api';
import { LoginReq } from 'api/request.type';
import { AxiosResponseCustom, LoginRes } from './response.type';

// get 範例
// export function test() {
//   return apiHelper({
//     url: `/test`,
//     method: 'get',
//   });
// }

// // post 範例
export function login(data: LoginReq) {
  return apiHelper({
    url: `/signin`,
    method: 'post',
    data: data,
  }).then((res: AxiosResponseCustom<LoginRes>) => res.data);
}
