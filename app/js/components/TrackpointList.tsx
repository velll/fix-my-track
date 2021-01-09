
import * as React from "react";
import { Trackpoint } from "../lib/activity";

class TrackpointList extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public trackpointRow(point: Trackpoint, index: number) {
    return <tr>
            <th> {index + 1} </th>
            <td> {new Date(point.time).toLocaleTimeString()} </td>
            <td> {point.lat} </td>
            <td> {point.long} </td>
          </tr>;
  }

  public render() {
   return <div className="trackpoint-list">
            <h2 className="title is-2">Trackpoints</h2>

            <table className="table is-hoverable">
              <tbody>
                { this.props.trackpoints.map((point, i) => this.trackpointRow(point, i)) }
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
