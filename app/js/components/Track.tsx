
import * as React from "react";
import { Activity } from "../lib/activity";
import { setupMap } from "../map";

class Track extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    (window as any).map = setupMap('map', {});
  }

  public trackpointRow(lat: number, long: number) {
    return <div>{lat}, {long}</div>;
  }

  public render() {
    console.log(this.props.activity.trackpoints);
   return <div className="trackpoint-list">

            { this.props.activity.totals.name}
            { this.props.activity.totals.time}

            List of all trackpoints
            { this.props.activity.trackpoints.map(point => this.trackpointRow(point.lat, point.long)) }

          </div>;
  }
}

interface Props {
  activity: Activity
}

interface State {
}

export { Track };
