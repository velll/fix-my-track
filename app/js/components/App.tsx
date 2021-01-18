import * as React from "react";
import { Activity, Trackpoint } from "../activity";
import { Dropzone } from "./Dropzone";
import { Track } from "./Track";

import { Edit } from "../edit";
import { Export } from "./Export";

class App extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {activity: null, trackFile: null, stage: Stage.start};

    this.processTrack = this.processTrack.bind(this);
    this.replaceTrackpoint = this.replaceTrackpoint.bind(this);
    this.goToExport = this.goToExport.bind(this);
  }

  public async componentDidMount() {
    console.log("app mounted");
  }

  componentFor(stage: Stage) {
    switch(stage) {
      case Stage.start:
        return <Dropzone onFileRead={this.processTrack}></Dropzone>;
      case Stage.show:
        return <Track activity={this.state.activity!} replaceTrackpoint={this.replaceTrackpoint} nextStep={this.goToExport}></Track>;
      case Stage.export:
        return <Export activity={this.state.activity!}></Export>;
    }
  }

  processTrack(trackFile: string) {
    this.setState(_ => ({
      stage: Stage.show,
      trackFile: trackFile,
      activity: Activity.fromTCX(trackFile)
    }));
  }

  replaceTrackpoint(trackpointNo: number, trackpoint: Trackpoint) {
    this.setState(state => ({
      stage: state.stage,
      trackFile: state.trackFile,
      activity: state.activity!.applyEdit(new Edit(trackpointNo, trackpoint))
    }));
  }

  goToExport() {
    this.setState(state => ({
      stage: Stage.export,
      trackFile: state.trackFile,
      activity: state.activity
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
  show,
  export
}

export { App };
