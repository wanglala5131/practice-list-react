import apiHelper from 'helpers/api';
import {
  AxiosResponseCustom,
  GetItemsRes,
  OnlyStatusRes,
} from './response.type';

export const getItems = () => {
  return apiHelper({
    url: `/`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetItemsRes>) => res.data);
};

export const changeLike = (id: number) => {
  return apiHelper({
    url: `/items/like/${id}`,
    method: 'patch',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
