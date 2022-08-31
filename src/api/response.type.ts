import { AxiosRequestConfig } from 'axios';
import {
  ItemType,
  CartItem,
  CategoriesType,
  SubCategoriesType,
} from 'components/data.type';

export interface AxiosResponseCustom<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface OnlyStatusRes {
  status: string;
  message?: string;
}

export interface LoginRes {
  status: string;
  token: string;
  user: { id: number; name: string; email: string };
}

export interface RegisterRes {
  status: string;
  message?: string;
}

export interface CurrentUserRes {
  id: number;
  name: string;
  email: string;
}

export interface GetItemsRes {
  cartItems: CartItem[];
  cartItemsArr: number[];
  items: ItemType[];
}

export interface GetSubcategoriesRes {
  categories: CategoriesType[];
  subcategories: SubCategoriesType[];
}

export interface GetCategoriesRes extends Array<CategoriesType> {}

export interface addCategoryRes {
  UserId: number;
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface GetItemRes {
  status: string;
  cartItems: CartItem[];
  cartItemsArr: number[];
  item: ItemType;
  message?: string;
}

export interface putCategoryRes {
  status: string;
  message?: string;
  putCategory: CategoriesType;
}

export interface GetCartRes extends Array<CartItem> {}
