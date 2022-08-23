export interface PayloadType {
  type: string;
  payload: {
    isLoading: boolean;
  };
}

export const setLoading = (value: boolean): PayloadType => {
  return {
    type: 'SET_LOADING',
    payload: { isLoading: value },
  };
};
