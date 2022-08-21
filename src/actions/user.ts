export interface PayloadType {
  token: string;
  isLogin: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface setAuthType {
  type: string;
  payload: PayloadType;
}

export const setAuth = (values: PayloadType): setAuthType => {
  const { token, isLogin, user } = values;
  localStorage.setItem('token', token);

  return {
    type: 'SET_AUTH',
    payload: { token, isLogin, user },
  };
};

export const RemoveAuth = (): setAuthType => ({
  type: 'REMOVE_AUTH',
  payload: {
    token: '',
    isLogin: false,
    user: {
      id: 0,
      name: '',
      email: '',
    },
  },
});
