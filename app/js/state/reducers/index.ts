import { AnyAction, combineReducers, Reducer } from 'redux';
import { GlobalState } from '../types';

import stage from './stage';
import activity from './activity';
import waits from './waits';

const rootReducer: Reducer<GlobalState, AnyAction> = combineReducers({
  stage: stage,
  activity: activity,
  waits: waits
});

export default rootReducer;
