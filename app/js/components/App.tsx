import * as React from "react";
import { Activity } from "../lib/activity";
import { Dropzone } from "./Dropzone";
import { Track } from "./Track";

class App extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {activity: null, trackFile: null, stage: Stage.start};

    this.processTrack = this.processTrack.bind(this);
  }

  public async componentDidMount() {
    console.log("app mounted");
  }

  componentFor(stage: Stage) {
    if (stage == Stage.start) {
      return <Dropzone onFileRead={this.processTrack}></Dropzone>;
    } else {
      return <Track activity={this.state.activity!}></Track>;
    }
  }

  processTrack(trackFile: string) {
    this.setState(_ => ({
      stage: Stage.show,
      trackFile: trackFile,
      activity: Activity.fromTCX(trackFile)
    }));
  }

  public render() {
   return this.componentFor(this.state.stage);
  }
}

interface Props {
}

interface State {
  trackFile: string | null,
  activity: Activity | null,
  stage: Stage
}

enum Stage {
  start,
  show
}

export { App };
