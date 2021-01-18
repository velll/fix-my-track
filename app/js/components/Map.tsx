
import * as React from "react";
import { Trackpoint } from "../activity";
import { singleLine, points } from "../lib/geoJSON";
import { setupMap, InteractionHandler } from "../map";
import { InteractionHandlers } from './Track';

class Map extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const linePoints = points(this.props.trackpoints);
    (window as any).map = setupMap('map', linePoints, {interactionHandlers: this.props.handlers});
  }

  public render() {
    return  <div id="map"></div>;
  }
}

interface Props {
  trackpoints: Trackpoint[]
  handlers: InteractionHandlers
}

interface State {
}

export { Map };
