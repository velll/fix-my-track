import {fromLonLat} from 'ol/proj';

function singleLine(points: number[][]): {} {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': points.map(point => fromLonLat(point))
        }
      }
    ]
  };
}

function points(points: Point[]): {} {
  return {
    "type": "FeatureCollection",
    "features":
      points.map((point, i) => (
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': fromLonLat([point.long, point.lat])
          },
          'properties': {
            'index': i
          }
        }
      ))

  };

}

interface Point {
  lat: number,
  long: number
}

export { singleLine, points };


