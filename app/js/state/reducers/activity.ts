import { AnyAction, Reducer } from 'redux';
import { Activity } from '../../activity';
import { ActivityState } from '../types';

const activityReducer: Reducer<ActivityState, AnyAction> = (state: ActivityState | undefined, action: AnyAction): ActivityState => {
  switch (action.type) {
    case 'SAVE_PROCESSED_ACTIVITY':
      return { original: action.original, processed: action.processed };
    default:
      return state || { original: '', processed: Activity.empty()};
  }
};

export default activityReducer;
