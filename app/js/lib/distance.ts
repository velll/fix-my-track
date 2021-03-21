import { Coordinate } from 'ol/coordinate';
import {getDistance} from 'ol/sphere';

// TODO: delete?
const distanceBetween = (from: Coordinate, to: Coordinate) => (
  getDistance(from, to)
);

export { distanceBetween };
