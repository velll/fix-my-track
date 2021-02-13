
import * as React from "react";
import { Activity, Trackpoint, buildTrackpoint } from "../activity";
import { setupMap, InteractionHandler, InteractionHandlerExt } from "../map";
import { Map } from "./Map";
import { TrackStats } from "./TrackStats";

import './Track.css';
import { TrackpointRow } from "./TrackpointRow";
import { points } from "../lib/geoJSON";
import { distanceBetween } from "../lib/distance";
import { ExportButtons } from './ExportButtons';

class Track extends React.Component<Props, State>  {
  tableRef: React.RefObject<any>;
  mapInteractionHandlers: InteractionHandlers;

  constructor(props: Props) {
    super(props);
    this.state = {highlighted: -1};

    this.tableRef = React.createRef();

    this.focusTrackpoint = this.focusTrackpoint.bind(this);

    this.mapInteractionHandlers = {
      onSelected: this.focusTrackpoint.bind(this),
      onDeSelected: () => (null),
      onMoved: this.registerMove.bind(this)
    };
  }

  distance(point: Trackpoint, index: number, all: Trackpoint[]) {
    return index == 0 ? 0 : distanceBetween(point, all[index - 1]);
  }

  tableRow(trackpointNo: number) {
    return this.tableRef.current!.getElementsByTagName('tr')[trackpointNo];
  }

  focusTrackpoint(trackpointNo: number) {
    this.highlight(trackpointNo);
    this.scrollTo(trackpointNo);
  }

  scrollTo(trackpointNo: number) {
    this.tableRow(trackpointNo).scrollIntoView({block: "center"});
  }

  highlight(trackpointNo: number) {
    this.setState({ highlighted: trackpointNo });
  }

  registerMove(trackpointNo: number, coordinates: number[]) {
    const trackpoint = buildTrackpoint(
      this.props.activity.trackpoints[trackpointNo],
      coordinates);

    this.props.replaceTrackpoint(trackpointNo, trackpoint);
  }

  public render() {
    return  <div className="track">
              <Map trackpoints={this.props.activity.trackpoints} handlers={this.mapInteractionHandlers}></Map>

              <div className="track-data">
                <TrackStats sport={this.props.activity.totals.name} time={this.props.activity.totals.time}></TrackStats>

                <h2 className="title is-2">Trackpoints ({this.props.activity.trackpoints.length})</h2>
                <div className="trackpoint-list">
                  <table className="table is-hoverable" ref={this.tableRef}>
                    <tbody>
                      {
                        this.props.activity.trackpoints.map((point, i, allPoints) => (
                          <TrackpointRow index={i}
                                         key={i}
                                         point={point}
                                         distanceInc={this.distance(point, i, allPoints)}
                                         highlighted={this.state.highlighted == i} ></TrackpointRow>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
                <ExportButtons goToExport={this.props.nextStep}></ExportButtons>
              </div>
            </div>;
  }
}

interface Props {
  activity: Activity,
  replaceTrackpoint: (trackpointNo: number, trackpoint: Trackpoint) => void,
  nextStep: () => void
}

interface State {
  highlighted: number
}

interface InteractionHandlers {
  onSelected: InteractionHandler,
  onDeSelected: InteractionHandler,
  onMoved: InteractionHandlerExt

}

export { Track, InteractionHandlers };
