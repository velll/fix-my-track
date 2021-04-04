import { Lap } from '../../models/lap';
import { Trackpoint } from '../../models/trackpoint';
import { TCXNode } from './tcx-node';

const OPERATIONS = {
  int: (value: string) => (parseInt(value, 10)),
  float: (value: string) => (parseFloat(value))
};

const CONVERSIONS = {
  "TotalTimeSeconds": OPERATIONS.int,
  "DistanceMeters": OPERATIONS.int,
  "MaximumSpeed": OPERATIONS.float,
  "Calories": OPERATIONS.float
};

class TCXDocument {
  source: string;
  xmldoc: Document;
  activityNode: TCXNode;
  sport: string;

  constructor(source: string) {
    this.source = source;

    this.xmldoc = new DOMParser().parseFromString(source, "text/xml");

    const activityElement = this.xmldoc.getElementsByTagName("Activity")[0];
    this.activityNode = new TCXNode(activityElement);
    this.sport = activityElement.getAttribute('Sport') || '';
  }

  get laps(): Lap[]{
    const lapNodes = this.activityNode.children('Lap');

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

  get totalTime(): number {
    return parseInt(this.activityNode.childContent('TotalTimeSeconds'), 10);
  }

  public lapTotals(lap: TCXNode) {
    return {
      time: parseFloat(lap.childContent("TotalTimeSeconds")),
      distance: parseFloat(lap.childContent("DistanceMeters")),
      maxSpeed: parseFloat(lap.childContent("MaximumSpeed")),
      calories: parseFloat(lap.childContent("Calories", '0'))
    };
  }

  public trackpointsOf(lap: TCXNode): Trackpoint[] {
    const trackNode = lap.firstChild("Track");
    const allTrackpointNodes = trackNode.children("Trackpoint");

    const trackpointNodes = allTrackpointNodes.filter(node => (
      node.hasChild("Position") && node.hasChild("Time")
    ));

    return trackpointNodes.map(trackpoint => {
      const positionNode = trackpoint.firstChild("Position");

      return {
        time: trackpoint.childContent("Time"),
        lat: parseFloat(positionNode.childContent("LatitudeDegrees")),
        long: parseFloat(positionNode.childContent("LongitudeDegrees")),
        altitude: parseFloat(trackpoint.childContent("AltitudeMeters", '0'))
      };
    });
  }
}

export { TCXDocument };
