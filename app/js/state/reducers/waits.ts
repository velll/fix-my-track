import { AnyAction, Reducer } from 'redux';


const waitReducer: Reducer<number, AnyAction> = (state: number | undefined = 0, action: AnyAction): number => {
  switch (action.type) {
    case 'START_WAITING':
      return state + 1;
    case 'STOP_WAITING':
      return state - 1;
    default:
      return state;
  }
};

export default waitReducer;
