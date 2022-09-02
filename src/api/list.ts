import apiHelper from 'helpers/api';
import { SubmitCartReq } from './request.type';
import {
  AxiosResponseCustom,
  GetListsRes,
  GetListRes,
  OnlyStatusRes,
} from './response.type';

export const getLists = (params: { isUsed: boolean }) => {
  return apiHelper({
    url: `/lists`,
    method: 'get',
    params,
  }).then((res: AxiosResponseCustom<GetListsRes>) => res.data);
};

export const changeListStatus = (id: number) => {
  return apiHelper({
    url: `/lists/${id}`,
    method: 'patch',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const deleteList = (id: number) => {
  return apiHelper({
    url: `/lists/${id}`,
    method: 'delete',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const getList = (id: number) => {
  return apiHelper({
    url: `/lists/${id}`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetListRes>) => res.data);
};

export const addItemToList = (listId: number, data: { ItemId: number }) => {
  return apiHelper({
    url: `/lists/${listId}/additem`,
    method: 'post',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const deleteListItem = (listId: number, ItemId: number) => {
  return apiHelper({
    url: `/lists/${listId}/${ItemId}`,
    method: 'delete',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const putList = (listId: number, data: SubmitCartReq) => {
  return apiHelper({
    url: `lists/${listId}`,
    method: 'put',
    data,
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
