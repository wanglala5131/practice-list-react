import { AnyAction } from 'redux';

export const initState = {
  isLoading: false,
};

export const loadingReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload;
    default:
      return state;
  }
};
