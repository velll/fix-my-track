import { Edit } from '../../app/js/edit'
import { fiveTrackpoints } from './examples/trackpoints'

test('can apply an edit to an array of trackpoints', () => {
  const original = fiveTrackpoints
  const editAt = 2

  const originalTrackpoint = original[editAt]
  const editedTrackpoint = { time: "2020-12-12T12:00:00+00:00", lat: 60, long: 70 }

  const result = new Edit(editAt, editedTrackpoint).apply(original)

  expect(result[editAt]).toEqual(editedTrackpoint)
  expect(original[editAt]).toEqual(originalTrackpoint)

  expect(result[0]).toEqual(original[0])
});
