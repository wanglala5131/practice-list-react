import apiHelper from 'helpers/api';
import { ListItemsReq, SubmitCartReq } from './request.type';
import {
  AxiosResponseCustom,
  GetCartRes,
  OnlyStatusRes,
} from './response.type';

export const getCart = () => {
  return apiHelper({
    url: '/cart',
    method: 'get',
  }).then((res: AxiosResponseCustom<GetCartRes>) => res.data);
};

export const saveCart = (data: ListItemsReq) => {
  return apiHelper({
    url: '/cart/edit',
    method: 'put',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

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

export const submitCartItems = (data: SubmitCartReq) => {
  return apiHelper({
    url: '/lists',
    method: 'post',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
