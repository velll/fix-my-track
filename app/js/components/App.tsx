import * as React from "react";
import { Dropzone } from "./Dropzone";
import { Track } from "./Track";

class App extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {trackFile: null, stage: Stage.start};

    this.processTrack = this.processTrack.bind(this);
  }

  public async componentDidMount() {
    console.log("app mounted");
  }

  componentFor(stage: Stage) {
    if (stage == Stage.start) {
      return <Dropzone onFileRead={this.processTrack}></Dropzone>;
    } else {
      return <Track trackFile={this.state.trackFile!}></Track>;
    }
  }

  processTrack(trackFile: string) {
    this.setState({stage: Stage.show, trackFile: trackFile});
  }

  public render() {
   return this.componentFor(this.state.stage);
  }
}

interface Props {
}

interface State {
  trackFile: string | null,
  stage: Stage
}

enum Stage {
  start,
  show
}

export { App };
