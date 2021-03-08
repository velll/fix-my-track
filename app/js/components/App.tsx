import * as React from "react";
import { Activity, Trackpoint } from "../activity";

import Dropzone from "./Dropzone";
import Track from "./Track";
import Export from "./Export";

import { Edit } from "../edit";

import { connect, ConnectedProps, Provider } from 'react-redux';
import store from "../state/store";
import { GlobalState, Stage } from "../state/types";
import { NEXT_STAGE } from "../state/actions/stages";

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
        return <Dropzone onFileRead={this.processTrack}></Dropzone>;
      case Stage.show:
        return <Track/>;
      case Stage.export:
        return <Export/>;
    }
  }

  processTrack(trackFile: string) {
    const activity = Activity.fromTCX(trackFile);
    this.props.saveProcessed(trackFile, activity);
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
  saveProcessed: (original: string, processed: Activity) => (
    {
      type: 'SAVE_PROCESSED_ACTIVITY',
      original: original,
      processed: processed
    }
  )
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(App);
