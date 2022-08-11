export interface CategoriesType {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  Subcategories?: {
    id: number;
    name: string;
    userId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    CategoryId: number;
    UserId: number;
  }[];
  hasItems?: boolean;
  CategoryId?: number;
}

export interface SubCategoriesType {
  id: number;
  name: string;
  userId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  CategoryId: number;
  UserId: number;
  Items?: {
    CategoryId: number;
    ItemType: {
      ItemId: number;
      SubcategoryId: number;
      createdAt: string;
      itemId: number;
      subcategoryId: number;
      updatedAt: string;
    };
    UserId: number;
    categoryId: number;
    createdAt: string;
    description: string;
    id: number;
    image: null;
    isClosed: boolean;
    isLiked: boolean;
    limit: string;
    name: string;
    updatedAt: string;
    userId: number;
  }[];
  hasItems?: boolean;
}

export interface ItemType {
  id: number;
  name: string;
  description: string;
  image: string | null;
  userId: number;
  categoryId: number;
  limit: string;
  isClosed: boolean;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  CategoryId: number;
  UserId: number;
  Category: {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    UserId: number;
  };
  Subcategories: {
    id: number;
    name: string;
    userId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    CategoryId: number;
    UserId: number;
    ItemType: {
      subcategoryId: number;
      itemId: number;
      createdAt: string;
      updatedAt: string;
      ItemId: number;
      SubcategoryId: number;
    };
  }[];
}

export interface ItemsType extends Array<ItemType> {}

export interface CartItem {
  id: number;
  userId: number;
  itemId: number;
  reps: string;
  remark: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  ItemId: number;
  Item: ItemType;
}

export interface ItemsInList extends ItemType {
  ListItem: {
    listId: number;
    itemId: number;
    reps: string;
    remark: string;
    sort: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    ItemId: number;
    ListId: number;
    UserId: number;
  };
}

export interface ListType {
  id: number;
  userId: number;
  name: string;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  Items: ItemsInList[];
}
