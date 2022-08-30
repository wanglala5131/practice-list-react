import apiHelper from 'helpers/api';
import {
  AxiosResponseCustom,
  GetItemsRes,
  GetItemRes,
  OnlyStatusRes,
} from './response.type';

export const getItems = () => {
  return apiHelper({
    url: `/`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetItemsRes>) => res.data);
};

export const getCloseItems = () => {
  return apiHelper({
    url: `/items/close`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetItemsRes>) => res.data);
};

export const changeLike = (id: number) => {
  return apiHelper({
    url: `/items/like/${id}`,
    method: 'patch',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const getItem = (id: number) => {
  return apiHelper({
    url: `/items/${id}`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetItemRes>) => res.data);
};

export const addItem = (data: FormData) => {
  return apiHelper({
    url: `/items`,
    method: 'post',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const putItem = (id: number, data: FormData) => {
  return apiHelper({
    url: `/items/${id}`,
    method: 'put',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const toggleCloseItem = (id: number) => {
  return apiHelper({
    url: `/items/${id}}/close`,
    method: 'patch',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
