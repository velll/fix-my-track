
import * as React from "react";
import { Trackpoint } from "../lib/activity";
import { setupMap } from "../map";

class Map extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    (window as any).map = setupMap('map', {});
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
