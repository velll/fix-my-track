import { differenceSeconds, addSeconds } from '../../../app/js/lib/date-helpers'

// finding difference between two dates in seconds

test('same dates are no different', () => {
  const start = new Date(2021, 3, 29, 0, 0, 0, 0);
  const finish = new Date(2021, 3, 29, 0, 0, 0, 0); 
  
  expect(differenceSeconds(start, finish)).toEqual(0)
});

test('can find difference when its in seconds only', () => {
  const start = new Date(2021, 3, 29, 12, 35, 21, 0);
  const finish = new Date(2021, 3, 29, 12, 35, 31, 0);
  
  expect(differenceSeconds(start, finish)).toEqual(10)
});

test('ignores order', () => {
  const start = new Date(2021, 3, 29, 12, 35, 31, 0);
  const finish = new Date(2021, 3, 29, 12, 35, 21, 0);
  
  expect(differenceSeconds(start, finish)).toEqual(10)
});

test('deals with minutes and hours', () => {
  const start = new Date(2021, 3, 29, 12, 0, 0, 0);
  const finish = new Date(2021, 3, 29, 13, 21, 10, 0);
  
  expect(differenceSeconds(start, finish)).toEqual(10 + 21 * 60 + 1 * 60 * 60)
});


test('deals with days', () => {
  const start = new Date(2021, 3, 28, 23, 35, 31, 0);
  const finish = new Date(2021, 3, 29, 0, 10, 31, 0);
  
  expect(differenceSeconds(start, finish)).toEqual(25 * 60 + 10 * 60)
});

// adding seconds to a date

test('adding 0 seconds returns the same date', () => {
  const start = new Date(2021, 3, 29, 0, 0, 0, 0);
  
  expect(addSeconds(start, 0)).toEqual(start)
});

test('adding 1 second returns the date a second later', () => {
  const start = new Date(2021, 3, 29, 0, 0, 0, 0);
  const secondLater = new Date(2021, 3, 29, 0, 0, 1, 0);
  
  expect(addSeconds(start, 1)).toEqual(secondLater)
});

test('adding 11 minutes', () => {
  const start = new Date(2021, 3, 29, 0, 0, 0, 0);
  const later = new Date(2021, 3, 29, 0, 11, 0, 0);
  
  expect(addSeconds(start, 11 * 60)).toEqual(later)
});