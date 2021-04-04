import fs from 'fs';

import { decode } from '../../../app/js/lib/tcx/decode';

const file = (examplePath: string) => (
  fs.readFileSync(examplePath, 'utf8').toString()
);

test('Can parse a basic stub of a TCX track', () => {
  const tcx = file('spec/js/examples/tcx.example.xml');
  const activity = decode(tcx)!;

  expect(activity).toBeDefined;

  expect(activity.sport).toEqual('Running');

  expect(activity.laps.length).toBe(1);
  expect(activity.trackpoints.length).toBe(1);

  expect(activity.trackpoints[0].lat).toBeDefined;
  expect(activity.trackpoints[0].long).toBeDefined;
  expect(activity.trackpoints[0].time).toBeDefined;
});


test('Can parse a long TCX track', () => {
  const tcx = file('spec/js/examples/tcx.example.long.xml');
  const activity = decode(tcx)!;

  expect(activity.sport).toEqual('Running');

  expect(activity.laps.length).toBe(1);
  expect(activity.trackpoints.length).toBe(1921);

  expect(activity.trackpoints[0].lat).toBeDefined;
  expect(activity.trackpoints[0].long).toBeDefined;
  expect(activity.trackpoints[0].time).toBeDefined;
});

test('Refuses to parse an invalid TCX', () => {
  const tcx = file('spec/js/examples/not.a.tcx.xml');
  const activity = decode(tcx);

  expect(activity).toBeNull;
});

test('Refuses to parse non-XML', () => {
  const tcx = 'this is not even XML';
  const activity = decode(tcx);

  expect(activity).toBeNull;
});
