import { Activity } from "../../models/activity";
import { Lap as ActivityLap } from "../../models/lap";
import { Trackpoint } from "../../models/trackpoint";
import { distanceBetween } from "../distance";

function prepare(activity: Activity): PreparedActivity {
  return {
    sport: activity.sport,
    laps: activity.laps.map(lap => prepareLap(lap))
  };
}

function prepareLap(lap: ActivityLap): PreparedLap {
  return {
    time: lap.totals.time,
    distance: lap.totals.distance,
    maxSpeed: lap.totals.maxSpeed,
    startTime: lap.trackpoints[0].time,
    trackpoints: prepareTrackpoints(lap.trackpoints)
  };
}

function prepareTrackpoints(trackpoints: Trackpoint[]): PreparedTrackpoint[] {
  const prepared = trackpoints.map((trackpoint, index) => (
    {
      time: trackpoint.time,
      lat: trackpoint.lat,
      long: trackpoint.long,
      altitude: trackpoint.altitude,
      distance: index == 0 ? 0 : distanceBetween(
        [trackpoint.long, trackpoint.lat],
        [trackpoints[index - 1].long, trackpoints[index - 1].lat]
      )
    }
  ));

  // Distance must be cumulative
  let cumulativeDistance = 0;
  for (let i = 0; i < prepared.length; i++) {
    cumulativeDistance = cumulativeDistance + prepared[i].distance;
    prepared[i].distance = cumulativeDistance;
  }

  return prepared;
}

interface PreparedActivity {
  sport: string,
  laps: PreparedLap[]
}

interface PreparedLap {
  time: number,
  distance: number,
  maxSpeed: number,
  startTime: string,
  trackpoints: PreparedTrackpoint[]
}

interface PreparedTrackpoint {
  time: string,
  lat: number,
  long: number,
  altitude?: number,
  distance: number
}

export { prepare };
