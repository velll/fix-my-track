import { AnyAction, combineReducers, Reducer } from 'redux';
import { GlobalState } from '../types';

import stage from './stage';
import activity from './activity';

const rootReducer: Reducer<GlobalState, AnyAction> = combineReducers({
  stage: stage,
  activity: activity
});

export default rootReducer;
