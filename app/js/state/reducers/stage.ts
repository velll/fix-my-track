import { AnyAction, Reducer } from 'redux';
import { Stage } from '../types';

const stageProgression = [Stage.start, Stage.show, Stage.export];

function nextStage(stage: Stage) {
  const currentIndex = stageProgression.findIndex(progression => progression == stage);

  return stageProgression[currentIndex + 1];
}

function previousStage(stage: Stage) {
  const currentIndex = stageProgression.findIndex(progression => progression == stage);

  return stageProgression[currentIndex - 1];
}

const stageReducer: Reducer<Stage, AnyAction> = (state: Stage | undefined =  Stage.start, action: AnyAction): Stage => {
  switch (action.type) {
    case 'NEXT_STAGE':
      return nextStage(state);
    case 'PREVIOUS_STAGE':
      return previousStage(state);
    default:
      return state;
  }
};

export default stageReducer;
