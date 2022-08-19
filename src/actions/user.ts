export interface PayloadType {
  token: string;
  isLogin: boolean;
}

export interface setAuthType {
  type: string;
  payload: PayloadType;
}

export const setAuth = (values: PayloadType): setAuthType => {
  const { token, isLogin } = values;

  return {
    type: 'SET_AUTH',
    payload: { token, isLogin },
  };
};

export const RemoveAuth = (): setAuthType => ({
  type: 'REMOVE_AUTH',
  payload: { token: '', isLogin: false },
});
