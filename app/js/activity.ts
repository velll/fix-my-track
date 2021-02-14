import { Edit } from "./edit";
import { TCX } from "./lib/tcx";

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

  applyEdit(edit: Edit): Activity {
    this.laps[0].trackpoints = edit.apply(this.trackpoints);
    return this;
  }

  replaceTrackpoints(trackpoints: Trackpoint[]) {
    this.laps[0].trackpoints = trackpoints;
  }

  toTCX(){
    const tcx = new TCX(this.source);

    return tcx.modify(0, this.trackpoints);
  }
}

interface Trackpoint {
  lat: number,
  long: number,
  time: string
}

function buildTrackpoint(original: Trackpoint, coordinates: number[]): Trackpoint {
  return {
    time: original.time,
    long: coordinates![0],
    lat: coordinates![1]
  };
}

interface Lap {
  trackpoints: Trackpoint[]
}

interface Totals {
  name: string,
  time: number
}

export { Activity, Trackpoint, buildTrackpoint, Lap, Totals };