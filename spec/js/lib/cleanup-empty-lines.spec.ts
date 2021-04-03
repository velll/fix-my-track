import { cleanupEmptyLines } from '../../../app/js/lib/cleanup-empty-lines'

test('leaves a single line string alone', () => {
  const original = 'whatever man';
  const cleanedUp = cleanupEmptyLines(original);

  expect(cleanedUp).toEqual(original);
});

test('leaves a string without empty lines alone', () => {
  const original = `whatever
                    man
                    really`;
  const cleanedUp = cleanupEmptyLines(original);

  expect(cleanedUp).toEqual(original);
});

test('removes empty lines', () => {
  const original = `whatever

                    man

                    really`;

  const expected = `whatever
                    man
                    really`;
  const cleanedUp = cleanupEmptyLines(original);

  expect(cleanedUp).toEqual(expected);
});
