import { AnyAction, combineReducers, Reducer } from 'redux';
import { GlobalState } from '../types';

import stage from './stage';
import activity from './activity';
import waits from './waits';
import flashMessages from './flash-messages';

const rootReducer: Reducer<GlobalState, AnyAction> = combineReducers({
  stage: stage,
  activity: activity,
  waits: waits,
  flashMessages: flashMessages
});

export default rootReducer;
