import { lastOf } from "../lib/array";
import { differenceSeconds } from "../lib/date-helpers";
import { Dict } from "../lib/dict";
import { maxSpeed, totalDistace } from "../lib/distance";
import { Trackpoint } from "./trackpoint";

interface Lap {
  totals: Totals,
  trackpoints: Trackpoint[],
}

interface Totals {
  time: number,
  distance: number,
  maxSpeed: number,
  calories?: number
}

function aggregateTotals(trackpoints: Trackpoint[], extras: Dict<string> = {}): Totals {
  return {
    time: differenceSeconds(new Date(lastOf(trackpoints)!.time), new Date(trackpoints[0]!.time)),
    distance: totalDistace(trackpoints),
    maxSpeed: maxSpeed(trackpoints),
    ...extras
  };
}

export { Lap, aggregateTotals };
