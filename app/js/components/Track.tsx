
import * as React from "react";
import { Activity, buildTrackpoint, Trackpoint } from "../activity";
import { InteractionHandler, InteractionHandlerExt } from "../map";
import { Map } from "./Map";
import { TrackStats } from "./TrackStats";

import './Track.css';
import { TrackpointRow } from "./TrackpointRow";
import { distanceBetween } from "../lib/distance";
import ExportButtons from './ExportButtons';
import { GlobalState } from "../state/types";
import { connect, ConnectedProps } from "react-redux";

class Track extends React.Component<Props, State>  {
  tableRef: React.RefObject<any>;
  mapInteractionHandlers: InteractionHandlers;

  constructor(props: Props) {
    super(props);

    this.state = {
      highlighted: -1,
      trackpoints: props.activity.trackpoints.map(trackpoint => [trackpoint.long, trackpoint.lat]),
      extras: props.activity.trackpoints.map(trackpoint => ({time: trackpoint.time}))
    };

    this.tableRef = React.createRef();

    this.focusTrackpoint = this.focusTrackpoint.bind(this);
    this.save = this.save.bind(this);

    this.mapInteractionHandlers = {
      onSelected: this.focusTrackpoint.bind(this),
      onDeSelected: () => (null),
      onMoved: this.registerMove.bind(this)
    };
  }

  componentDidMount() {
    console.log('mounted track');
    console.log(this.props.activity);
  }

  distance(point: number[], index: number, all: number[][]) {
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

  registerMove(coordinates: number[][]) {
    this.setState(state => ({
      ...state,
      trackpoints: coordinates
    }));
  }

  save(){
    const activity = this.props.activity;

    activity.replaceTrackpoints(
      activity.trackpoints.map((original, i) => buildTrackpoint(original, this.state.trackpoints[i]))
    );

    this.props.nextStage();
  }

  public render() {
    const activity = this.props.activity;

    return  <div className="track">
              <Map trackpoints={this.state.trackpoints} handlers={this.mapInteractionHandlers}></Map>

              <div className="track-data">
                <TrackStats sport={activity.totals.name} time={activity.totals.time}></TrackStats>

                <h2 className="title is-2">Trackpoints ({this.state.trackpoints.length})</h2>
                <div className="trackpoint-list">
                  <table className="table is-hoverable" ref={this.tableRef}>
                    <tbody>
                      {
                        this.state.trackpoints.map((point, i, allPoints) => (
                          <TrackpointRow index={i}
                                         key={i}
                                         coordinates={point}
                                         extra={this.state.extras[i]}
                                         distanceInc={this.distance(point, i, allPoints)}
                                         highlighted={this.state.highlighted == i} ></TrackpointRow>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
                <ExportButtons save={this.save}/>
              </div>
            </div>;
  }
}

interface State {
  highlighted: number,
  trackpoints: number[][],
  extras: Extra[]
}

interface Extra {
  time: string
}

interface InteractionHandlers {
  onSelected: InteractionHandler,
  onDeSelected: InteractionHandler,
  onMoved: InteractionHandlerExt
}

function mapStateToProps(state: GlobalState) {
  return { activity: state.activity!.processed };
}

const mapDispatch = {
  nextStage: () => ({ type: 'NEXT_STAGE' })
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(Track);
export { Extra, InteractionHandlers };
