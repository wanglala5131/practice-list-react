import { AnyAction } from 'redux';

export const initState = {
  token: '',
  isLogin: false,
  user: {
    id: 0,
    name: '',
    email: '',
  },
};

export const userReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.payload;
    case 'REMOVE_AUTH':
      return initState;
    default:
      return state;
  }
};
