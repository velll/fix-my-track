import { AnyAction, Reducer } from 'redux';
import { Source } from '../types';

const sourceReducer: Reducer<number, AnyAction> = (state: Source | undefined = Source.file, action: AnyAction): number => {
  switch (action.type) {
    case 'SET_SOURCE':
      return action.source;
    default:
      return state;
  }
};

export default sourceReducer;
