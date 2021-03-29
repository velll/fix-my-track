interface Trackpoint {
  lat: number,
  long: number,
  time: string,
  altitude?: number
}

function buildTrackpoint(original: Trackpoint, coordinates: number[]): Trackpoint {
  return {
    time: original.time,
    long: coordinates![0],
    lat: coordinates![1],
    altitude: original.altitude
  };
}


export { Trackpoint, buildTrackpoint };

