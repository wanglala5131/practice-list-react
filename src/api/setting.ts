import apiHelper from 'helpers/api';
import { AxiosResponseCustom, GetCategories } from './response.type';

export const getCategories = () => {
  return apiHelper({
    url: `/setting/subcategories`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetCategories>) => res.data);
};
