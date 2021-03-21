import stageReducer from '../../../app/js/state/reducers/stage'
import { Stage } from '../../../app/js/state/types';
import { NEXT_STAGE, PREVIOUS_STAGE } from '../../../app/js/state/actions/stages'

test('scrolls to next stage', () => {
  expect(stageReducer(Stage.start, NEXT_STAGE)).toBe(Stage.show)
});

test('does not wrap around after the last stage', () => {
  expect(stageReducer(Stage.export, NEXT_STAGE)).toBe(Stage.export)
});

test('scrolls to previous stage', () => {
  expect(stageReducer(Stage.export, PREVIOUS_STAGE)).toBe(Stage.show)
});

test('does not wrap around before the first stage', () => {
  expect(stageReducer(Stage.start, PREVIOUS_STAGE)).toBe(Stage.start)
});
