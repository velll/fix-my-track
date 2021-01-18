import { replaceAt } from '../../../app/js/lib/array'

test('can replace an element of a scalar array without mutating it', () => {
  const original = [1,2,3,4,5]
  
  const edited = replaceAt(original, 2, 20);

  expect(original[2]).toEqual(3)
  expect(edited[2]).toEqual(20)

  expect(edited[0]).toEqual(original[0])
});


test('can replace an element of an array of object without mutating it', () => {
  const original = [
    {table: 'mahogany', chair: 'spruce'},
    {kitchentop: 'maple'}, {stand: 'maple'}
  ]
  
  const edited = replaceAt(original, 1, {kitchentop: 'marble'});

  expect(original[1].kitchentop).toEqual('maple')
  expect(edited[1].kitchentop).toEqual('marble')
  expect(edited[1].stand).toBeUndefined()
});
