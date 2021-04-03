import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import {getDistance} from 'ol/sphere';
import { differenceSeconds } from './date-helpers';

// TODO: delete?
const distanceBetween = (from: Coordinate, to: Coordinate) => (
  getDistance(from, to)
);

const totalDistace = (trackpoints: {lat: number, long: number}[]): number => {
  if (trackpoints.length == 0) { return 0; }

  const total = trackpoints.reduce((total, current, currentIndex) => {
    if (currentIndex == 0) {
      return 0;
    } else {
      const previous = trackpoints[currentIndex - 1];

      return total + distanceBetween([previous.long, previous.lat], [current.long, current.lat]);
    }
  }, 0);

  return total;
};

const maxSpeed = (trackpoints: {lat: number, long: number, time: string}[]): number => {
  if (trackpoints.length == 0) { return 0; }

  const maxSpeed = trackpoints.reduce((maxSpeed, current, currentIndex) => {
    if (currentIndex == 0) {
      return 0;
    } else {
      const previous = trackpoints[currentIndex - 1];
      const distance = distanceBetween([previous.long, previous.lat], [current.long, current.lat]);
      const time = differenceSeconds(new Date(previous.time), new Date(current.time));

      const speed = (distance / time);

      return Math.max(maxSpeed, speed);
    }
  }, 0);

  return maxSpeed;
};


export { distanceBetween, totalDistace, maxSpeed };
