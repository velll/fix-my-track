
import * as React from "react";
import { setupMap } from "../map";

class Track extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    (window as any).map = setupMap('map', {});
  }

  public render() {
   return <div className="trackpoint-list">
            List of all trackpoints

            {this.props.trackFile}
          </div>;
  }
}

interface Props {
  trackFile: string
}

interface State {
}

export { Track };
