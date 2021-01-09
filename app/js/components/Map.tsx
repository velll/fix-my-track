
import * as React from "react";
import { Trackpoint } from "../lib/activity";
import { singleLine } from "../lib/geoJSON";
import { setupMap } from "../map";

class Map extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const linePoints = singleLine(this.props.trackpoints);
    (window as any).map = setupMap('map', linePoints);
  }

  public render() {
    return  <div id="map"></div>;
  }
}

interface Props {
  trackpoints: Trackpoint[]
}

interface State {
}

export { Map };
