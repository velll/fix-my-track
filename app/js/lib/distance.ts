import {getDistance} from 'ol/sphere';
import { Trackpoint } from '../activity';

const distanceBetween = (from: Trackpoint, to: Trackpoint) => (
  getDistance([from.long, from.lat], [to.long, to.lat])
);

export { distanceBetween };