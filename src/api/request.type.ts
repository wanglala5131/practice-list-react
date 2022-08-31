export interface LoginReq {
  email: string | number; // 配合 formik 的 value 有 number 形式
  password: string | number;
}

export interface RegisterReq {
  name: string | number;
  email: string | number; // 配合 formik 的 value 有 number 形式
  password: string | number;
  confirmPassword: string | number;
}

// save cart and put listItem
export interface ListItemsReq {
  updateItems: {
    ItemId: number;
    reps: string;
    remark: string;
    sort: number;
  }[];
}

export interface SubmitCartReq extends ListItemsReq {
  listName: string;
}
