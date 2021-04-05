
import React from "react";
import { buildTrackpoint } from "../models/trackpoint";
import { InteractionHandler, InteractionHandlerExt } from "../map";
import { GlobalState } from "../state/types";
import { connect, ConnectedProps } from "react-redux";
import { waiting } from "../state/helpers/waits";
import Track from "./Track";

class TrackContainer extends React.Component<Props, State>  {
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

  @waiting
  save(){
    const activity = this.props.activity;

    activity.replaceTrackpoints(
      activity.trackpoints.map((original, i) => buildTrackpoint(original, this.state.trackpoints[i]))
    );

    this.props.nextStage();
  }

  public render() {
    return  <Track activity={this.props.activity}
                   mapInteractionHandlers={this.mapInteractionHandlers}
                   highlighted={this.state.highlighted}
                   trackpoints={this.state.trackpoints}
                   extras={this.state.extras}
                   tableRef={this.tableRef}
                   save={this.save} />;
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

export default connector(TrackContainer);
export { Extra, InteractionHandlers };
