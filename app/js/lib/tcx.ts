import { Trackpoint, Lap, Totals } from '../activity';
import { firstChild } from 'xml-wrappers';
import { select } from 'xml-wrappers';

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
    // const lapNodes = Array.from(this.xmldoc.getElementsByTagName('Lap'))
    const lapNodes = select(this.xmldoc, "//ns:Activity/ns:Lap");
    console.log(lapNodes)

    return lapNodes.map(lapNode => (
      { trackpoints: this.trackpointsOf(lapNode).filter(pos => pos.lat && pos.long) }
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

  positionCoordinates(context: Node): {lat: number, long: number} {
    const latNode = firstChild(context, 'LatitudeDegrees');
    const lat = latNode ? latNode.textContent || '0' : '0';

    const longNode = firstChild(context, 'LongitudeDegrees');
    const long = longNode ? longNode.textContent || '0' : '0';

    return {lat: parseFloat(lat), long: parseFloat(long)};
  }

  trackpointsOf(lap: Node): Trackpoint[] {
    const trackpointNodes = select(this.xmldoc, '//ns:Track/ns:Trackpoint').map(node => (
      {
        timeNode: firstChild(node, 'Time'),
        positionNode: firstChild(node, 'Position')
      })).filter(({timeNode, positionNode}) => timeNode && positionNode);

     return trackpointNodes.map(({timeNode, positionNode}) => (
      {
        time: timeNode!.textContent || '',
        ...this.positionCoordinates(positionNode!)
      }
     ));
  }

  modify(lap: number, trackpoints: {long: number, lat: number}[]) {
    if (trackpoints.length != this.trackpoints.length) {
      throw new Error('Inconsistent trackpoints length');
    }

    const latNodes = select(this.xmldoc, "//ns:Trackpoint/ns:Position/ns:LatitudeDegrees");
    const lonNodes = select(this.xmldoc, "//ns:Trackpoint/ns:Position/ns:LongitudeDegrees");

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
