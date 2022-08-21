export interface LoginReq {
  email: string | number; // 配合 formik 的 value 有 number 形式
  password: string | number;
}
