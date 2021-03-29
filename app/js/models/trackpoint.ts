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


export { Trackpoint, buildTrackpoint };

