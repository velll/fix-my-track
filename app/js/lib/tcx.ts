import { Trackpoint, Lap, Totals } from '../activity';
import { getNodes } from './xpath';

class TCX {
  source: string;
  xmldoc: Document;
  activity: Element;

  constructor(source: string) {
    this.source = source;

    this.xmldoc = new DOMParser().parseFromString(source, "text/xml");
    this.activity = this.xmldoc.getElementsByTagName("Activity")[0];
  }

  get laps(): Lap[]{
    const lapElements = Array.from(this.activity.getElementsByTagName("Lap"));

    return lapElements.map(lapElement => (
      { trackpoints: this.trackpointsOf(lapElement)}
    ));
  }

  get trackpoints(): Trackpoint[] {
    return this.laps[0].trackpoints;
  }

  get activityName(): string {
    return this.activity.getAttribute('Sport') || '';
  }

  get totalTime(): number {
    const tag = this.activity.getElementsByTagName('TotalTimeSeconds')[0];

    return parseInt(tag.textContent || '0', 10);
  }

  get totals(): Totals {
    return { time: this.totalTime, name: this.activityName };
  }

  public trackpointsOf(lap: Element): Trackpoint[] {
    const trackpointElements = Array.from(
      lap.getElementsByTagName("Track")[0].getElementsByTagName("Trackpoint")).filter(element => (
        element.getElementsByTagName("Position")[0] && element.getElementsByTagName("Time")[0]
      ));


    return trackpointElements.map((trackpoint: Element) => {
      return {
        time: trackpoint.getElementsByTagName("Time")[0].textContent || '',
        lat: parseFloat(
               trackpoint.getElementsByTagName("Position")[0].getElementsByTagName("LatitudeDegrees")[0].textContent  || '0'),
        long: parseFloat(
               trackpoint.getElementsByTagName("Position")[0].getElementsByTagName("LongitudeDegrees")[0].textContent  || '0')
      };
    });
  }

  modify(lap: number, trackpoints: {long: number, lat: number}[]) {
    if (trackpoints.length != this.trackpoints.length) {
      throw new Error('Inconsistent trackpoints length');
    }

    const latNodes = getNodes(this.xmldoc, "//ns:Trackpoint/ns:Position/ns:LatitudeDegrees");
    const lonNodes = getNodes(this.xmldoc, "//ns:Trackpoint/ns:Position/ns:LongitudeDegrees");

    latNodes.forEach((node, i) => {
      node!.textContent = trackpoints[i].lat.toString();
    });

    lonNodes.forEach((node, i) => {
      node!.textContent = trackpoints[i].long.toString();
    });

    return new XMLSerializer().serializeToString(this.xmldoc.documentElement);
  }
}

export { TCX };
