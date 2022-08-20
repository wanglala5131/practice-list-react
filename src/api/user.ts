import apiHelper from 'helpers/api';

// get 範例
export function test() {
  return apiHelper({
    url: `/test`,
    method: 'get',
  });
}

// // post 範例
// export function postExample(data: string) {
//   return apiHelper({
//     url: `/donate`,
//     method: 'post',
//     data: data,
//   });
// }
