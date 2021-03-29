import { TCX } from "../lib/tcx";
import { aggregateTotals, Lap } from "./lap";
import { Trackpoint } from "./trackpoint";

class Activity {
  sport: string;
  source: string;
  laps: Lap[];

  static DEFAULT_SPORT = 'Running';

  constructor(sport: string, laps: Lap[], source: string = '') {
    this.sport = sport;
    this.laps = laps;
    this.source = source;
  }

  static empty() {
    const emptyLaps = [{trackpoints: [], totals: {time: 1, distance: 1, maxSpeed: 1 }}];

    return new Activity(Activity.DEFAULT_SPORT, emptyLaps);
  }

  static fromTCX(source: string) {
    const tcx = new TCX(source);

    return new Activity(tcx.sport, tcx.laps, source);
  }

  static fromTrackpoints(sport: string, trackpoints: Trackpoint[]) {
    return new Activity(sport, [{trackpoints: trackpoints, totals: aggregateTotals(trackpoints)}]);
  }

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }

  get totalTime(): number {
    return this.laps.reduce((total, lap) => (total + lap.totals.time), 0);
  }

  replaceTrackpoints(trackpoints: Trackpoint[]) {
    this.laps[0].trackpoints = trackpoints;
  }

  toTCX(){
    const tcx = new TCX(this.source);

    return tcx.modify(0, this.trackpoints);
  }
}

export { Activity };
