import * as React from "react";
import { Activity } from "../models/activity";

import Import from "./Import";
import Track from "./Track";
import Export from "./Export";

import { connect, ConnectedProps, Provider } from 'react-redux';
import store from "../state/store";
import { GlobalState, Stage } from "../state/types";
import { NEXT_STAGE } from "../state/actions/stages";
import { decode as decodeTCX } from "../lib/tcx/decode";
import { SAVE_PROCESSED_ACTIVITY } from "../state/actions/activities";

class App extends React.Component<Props, {}>  {
  constructor(props: Props) {
    super(props);

    this.processTrack = this.processTrack.bind(this);
  }

  public async componentDidMount() {
    console.log("app mounted");
  }

  componentFor(stage: Stage) {
    switch(stage) {
      case Stage.start:
        return <Import onFileRead={this.processTrack}></Import>;
      case Stage.show:
        return <Track/>;
      case Stage.export:
        return <Export/>;
    }
  }

  processTrack(trackFile: string) {
    const activity = decodeTCX(trackFile);
    this.props.saveProcessed(activity, trackFile);
    this.props.nextStage();
  }

  public render() {
    return this.componentFor(this.props.stage);
  }
}

function mapStateToProps(state: GlobalState) {
  return { stage: state.stage, activity: state.activity };
}

const mapDispatch = {
  nextStage: () => NEXT_STAGE,
  saveProcessed: SAVE_PROCESSED_ACTIVITY
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(App);
