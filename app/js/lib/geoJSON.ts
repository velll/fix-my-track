import {fromLonLat} from 'ol/proj';

function singleLine(points: Point[]): {} {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': points.map(point => fromLonLat([point.long, point.lat]))
        }
      }
    ]
  };
}

interface Point {
  lat: number,
  long: number
}

export { singleLine };


