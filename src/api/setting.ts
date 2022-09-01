import apiHelper from 'helpers/api';
import {
  AxiosResponseCustom,
  GetCategoriesRes,
  GetSubcategoriesRes,
  AddCategoryRes,
  PutCategoryRes,
  OnlyStatusRes,
} from './response.type';

export const getSubcategories = () => {
  return apiHelper({
    url: `/setting/subcategories`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetSubcategoriesRes>) => res.data);
};

export const getCategories = () => {
  return apiHelper({
    url: `/setting/categories`,
    method: 'get',
  }).then((res: AxiosResponseCustom<GetCategoriesRes>) => res.data);
};

export const addCategory = (data: { name: string }) => {
  return apiHelper({
    url: `/setting/categories`,
    method: 'post',
    data,
  }).then((res: AxiosResponseCustom<AddCategoryRes>) => res.data);
};

export const addSubcategory = (data: { name: string; CategoryId: number }) => {
  return apiHelper({
    url: `/setting/subcategories`,
    method: 'post',
    data,
  }).then((res: AxiosResponseCustom<GetSubcategoriesRes>) => res.data);
};

export const deleteCategory = (id: number) => {
  return apiHelper({
    url: `/setting/categories/${id}`,
    method: 'delete',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const deleteSubcategory = (id: number) => {
  return apiHelper({
    url: `/setting/subcategories/${id}`,
    method: 'delete',
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};

export const putCategory = (id: number, data: { name: string }) => {
  return apiHelper({
    url: `/setting/categories/${id}`,
    method: 'put',
    data,
  }).then((res: AxiosResponseCustom<PutCategoryRes>) => res.data);
};

export const putSubcategory = (
  id: number,
  value: {
    name?: string;
    CategoryId?: number;
  }
) => {
  return apiHelper({
    url: `/setting/subcategories/${id}`,
    method: 'put',
    data: {
      value,
    },
  }).then((res: AxiosResponseCustom<OnlyStatusRes>) => res.data);
};
