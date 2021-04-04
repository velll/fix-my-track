import { Lap } from "./lap";
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

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }

  get totalTime(): number {
    return this.laps.reduce((total, lap) => (total + lap.totals.time), 0);
  }

  replaceTrackpoints(trackpoints: Trackpoint[]) {
    this.laps[0].trackpoints = trackpoints;
  }
}

export { Activity };
