
import * as React from "react";
import { Trackpoint } from "../lib/activity";
import { distanceBetween } from "../lib/distance";
import { round } from "../lib/round";

class TrackpointList extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public trackpointRow(point: Trackpoint, index: number, distanceInc: number) {
    return <tr>
            <th> {index + 1} </th>
            <td> {new Date(point.time).toLocaleTimeString()} </td>
            <td> {round(distanceInc, 1)}m </td>
            <td> {point.lat} </td>
            <td> {point.long} </td>
          </tr>;
  }

  public distance(point: Trackpoint, index: number, all: Trackpoint[]) {
    if (index == 0) {
      return 0;
    } else {
      return distanceBetween(point, all[index - 1]);
    }
  }

  public render() {
   return <div className="trackpoint-list">
            <h2 className="title is-2">Trackpoints</h2>

            <table className="table is-hoverable">
              <tbody>
                {
                  this.props.trackpoints.map((point, i, allPoints) => (
                    this.trackpointRow(point, i, this.distance(point, i, allPoints))
                  ))
                }
              </tbody>
            </table>

          </div>;
  }
}

interface Props {
  trackpoints: Trackpoint[]
}

interface State {
}

export { TrackpointList };
