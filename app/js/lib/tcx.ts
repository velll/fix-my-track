import { children, firstChild } from 'xml-wrappers';

import { Lap } from '../models/lap';
import { Trackpoint } from '../models/trackpoint';

class TCX {
  source: string;
  xmldoc: Document;
  activityNode: Element;

  constructor(source: string) {
    this.source = source;

    this.xmldoc = new DOMParser().parseFromString(source, "text/xml");
    this.activityNode = this.xmldoc.getElementsByTagName("Activity")[0];
  }

  get laps(): Lap[]{
    const lapNodes = children(this.activityNode, 'Lap');

    return lapNodes.map(lapNode => (
      {
        trackpoints: this.trackpointsOf(lapNode),
        totals: this.lapTotals(lapNode)
      }
    ));
  }

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }

  get sport(): string {
    return this.activityNode.getAttribute('Sport') || '';
  }

  get totalTime(): number {
    const tag = firstChild(this.activityNode, 'TotalTimeSeconds');

    return parseInt(tag?.textContent || '0', 10);
  }

  public lapTotals(lap: Node) {
    return {
      time: parseFloat(firstChild(lap, "TotalTimeSeconds")?.textContent || '0'),
      distance: parseFloat(firstChild(lap, "DistanceMeters")?.textContent || '0'),
      maxSpeed: parseFloat(firstChild(lap, "MaximumSpeed")?.textContent || '0'),
      calories: parseFloat(firstChild(lap, "Calories")?.textContent || '0')
    };
  }

  public trackpointsOf(lap: Node): Trackpoint[] {
    const trackNode = firstChild(lap, "Track");
    const allTrackpointNodes = children(trackNode!, "Trackpoint");

    const trackpointNodes = allTrackpointNodes.filter(node => (
      firstChild(node, "Position") && firstChild(node, "Time")
    ));

    return trackpointNodes.map((trackpoint: Node) => {
      const positionNode = firstChild(trackpoint, "Position");

      return {
        time: firstChild(trackpoint, "Time")!.textContent || '',
        lat: parseFloat(firstChild(positionNode!, "LatitudeDegrees")?.textContent  || '0'),
        long: parseFloat(firstChild(positionNode!, "LongitudeDegrees")?.textContent  || '0'),
        altitude: parseFloat(firstChild(trackpoint, "AltitudeMeters")!.textContent  || '0')
      };
    });
  }
}

export { TCX };
