import apiHelper from 'helpers/api';
import {
  AxiosResponseCustom,
  GetListsRes,
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
