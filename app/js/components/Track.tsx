
import * as React from "react";
import { Activity } from "../lib/activity";
import { setupMap } from "../map";
import { Map } from "./Map";
import { TrackpointList } from "./TrackpointList";
import { TrackStats } from "./TrackStats";

import './Track.css';

class Track extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    console.log(this.props.activity.trackpoints);
    return  <div className="track">
              <Map trackpoints={this.props.activity.trackpoints}></Map>
              <div className="track-data">
                <TrackStats sport={this.props.activity.totals.name} time={this.props.activity.totals.time}></TrackStats>
                <TrackpointList trackpoints={this.props.activity.trackpoints}></TrackpointList>
              </div>
            </div>;
  }
}

interface Props {
  activity: Activity
}

interface State {
}

export { Track };
