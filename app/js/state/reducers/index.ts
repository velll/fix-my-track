import { AnyAction, combineReducers, Reducer } from 'redux';
import { globalState } from '../types';

import stage from './stage';
import activity from './activity';

const rootReducer: Reducer<globalState, AnyAction> = combineReducers({
  stage: stage,
  activity: activity
});

export default rootReducer;
