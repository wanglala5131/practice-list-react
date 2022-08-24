import apiHelper from 'helpers/api';
import { AxiosResponseCustom, OnlyStatusRes } from './response.type';

export const addToCart = (id: number) => {
  return apiHelper({
    url: `/cart/${id}`,
    method: 'post',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const deleteCartItem = (id: number) => {
  return apiHelper({
    url: `/cart/${id}`,
    method: 'delete',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
