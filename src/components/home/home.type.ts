export type CategoriesType =
  | {
      id: number;
      name: string;
      userId: number;
      createdAt: string;
      updatedAt: string;
      UserId: number;
    }[];

export type SubCategoriesType =
  | {
      id: number;
      name: string;
      userId: number;
      categoryId: number;
      createdAt: string;
      updatedAt: string;
      CategoryId: number;
      UserId: number;
      Items?: object;
    }[];

export type ItemsType =
  | {
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
      Subcategories?: {
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
    }[];
