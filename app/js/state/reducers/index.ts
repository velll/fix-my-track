import { Action, AnyAction, Reducer } from 'redux';
import { globalState, Stage } from '../types';

const stageProgression = [Stage.start, Stage.show, Stage.export];

function nextStage(stage: Stage) {
  const currentIndex = stageProgression.findIndex(progression => progression == stage);

  return stageProgression[currentIndex + 1];
}

function previousStage(stage: Stage) {
  const currentIndex = stageProgression.findIndex(progression => progression == stage);

  return stageProgression[currentIndex - 1];
}

const rootReducer: Reducer<globalState, AnyAction> = (state: globalState | undefined, action: AnyAction): globalState => {
  switch (action.type) {
    case 'NEXT_STAGE':
      return { ...state, stage: nextStage(state!.stage), activity: state?.activity };
    case 'PREVIOUS_STAGE':
      return { ...state, stage: previousStage(state!.stage), activity: state?.activity };
    case 'SAVE_PROCESSED_ACTIVITY':
      return { stage: nextStage(state!.stage), activity: { original: action.original, processed: action.processed } };
    default:
      return { stage: Stage.start, activity: undefined };
  }
};

export default rootReducer;
