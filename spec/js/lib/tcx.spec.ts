import fs from 'fs';

import { TCX } from '../../../app/js/lib/tcx'

const initialize = (examplePath: string) => {
  const file = fs.readFileSync(examplePath, 'utf8');
  return new TCX(file.toString())
}

test('Can parse a basic stub of a TCX track', () => {
  const tcx = initialize('spec/js/examples/tcx.example.xml')
  
  expect(tcx.activityName).toEqual('Running');
  
  expect(tcx.laps.length).toBe(1);
  expect(tcx.trackpoints.length).toBe(1);

  expect(tcx.trackpoints[0].lat).toBeDefined
  expect(tcx.trackpoints[0].long).toBeDefined
  expect(tcx.trackpoints[0].time).toBeDefined
});


test('Can parse a long TCX track', () => {
  const tcx = initialize('spec/js/examples/tcx.example.long.xml')
  
  expect(tcx.activityName).toEqual('Running');
  
  expect(tcx.laps.length).toBe(1);
  expect(tcx.trackpoints.length).toBe(1921);

  expect(tcx.trackpoints[0].lat).toBeDefined
  expect(tcx.trackpoints[0].long).toBeDefined
  expect(tcx.trackpoints[0].time).toBeDefined
});