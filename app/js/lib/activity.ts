import { TCX } from "./tcx";

class Activity {
  source: string;
  laps: Lap[];
  totals: Totals;

  constructor(totals: Totals, laps: Lap[], source: string) {
    this.totals = totals;
    this.laps = laps;
    this.source = source;
  }

  static fromTCX(source: string) {
    const tcx = new TCX(source);

    return new Activity(tcx.totals, tcx.laps, source);
  }

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }
}

interface Trackpoint {
  lat: number,
  long: number,
  time: string
}

interface Lap {
  trackpoints: Trackpoint[]
}

interface Totals {
  name: string,
  time: number
}

export { Activity, Trackpoint, Lap, Totals };