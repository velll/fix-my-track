import { firstChild } from 'xml-wrappers';
import { select } from 'xml-wrappers';

import { aggregateTotals, Lap } from '../models/lap';
import { Trackpoint } from '../models/trackpoint';

class TCX {
  source: string;
  xmldoc: Document;
  activityElement: Element;

  constructor(source: string) {
    this.source = source;

    this.xmldoc = new DOMParser().parseFromString(source, "text/xml");
    this.activityElement = this.xmldoc.getElementsByTagName("Activity")[0];
  }

  get laps(): Lap[]{
    const lapElements = Array.from(this.activityElement.getElementsByTagName("Lap"));

    return lapElements.map(lapElement => (
      {
        trackpoints: this.trackpointsOf(lapElement),
        totals: this.lapTotals(lapElement)
      }
    ));
  }

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }

  get sport(): string {
    return this.activityElement.getAttribute('Sport') || '';
  }

  get totalTime(): number {
    const tag = this.activityElement.getElementsByTagName('TotalTimeSeconds')[0];

    return parseInt(tag.textContent || '0', 10);
  }

  public lapTotals(lap: Element) {
    return {
      time: parseFloat(lap.getElementsByTagName("TotalTimeSeconds")[0].textContent || '0'),
      distance: parseFloat(lap.getElementsByTagName("DistanceMeters")[0].textContent || '0'),
      maxSpeed: parseFloat(lap.getElementsByTagName("MaximumSpeed")[0].textContent || '0'),
      calories: parseFloat(lap.getElementsByTagName("Calories")[0]?.textContent || '0')
    };
  }

  public trackpointsOf(lap: Element): Trackpoint[] {
    const trackElement = lap.getElementsByTagName("Track")[0];
    const allTrackpointElements = Array.from(trackElement.getElementsByTagName("Trackpoint"));

    const trackpointElements = allTrackpointElements.filter(element => (
      element.getElementsByTagName("Position")[0] && element.getElementsByTagName("Time")[0]
    ));

    return trackpointElements.map((trackpoint: Element) => {
      return {
        time: trackpoint.getElementsByTagName("Time")[0].textContent || '',
        lat: parseFloat(
               trackpoint.getElementsByTagName("Position")[0].getElementsByTagName("LatitudeDegrees")[0].textContent  || '0'),
        long: parseFloat(
               trackpoint.getElementsByTagName("Position")[0].getElementsByTagName("LongitudeDegrees")[0].textContent  || '0'),
        altitude: parseFloat(trackpoint.getElementsByTagName("AltitudeMeters")[0].textContent  || '0')
      };
    });
  }
}

export { TCX };
