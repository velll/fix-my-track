
import { Coordinate } from "ol/coordinate";
import * as React from "react";
import { singleLine, points } from "../lib/geoJSON";
import { setupMap } from "../map";
import { InteractionHandlers } from './TrackContainer';

class Map extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const linePoints = singleLine(this.props.trackpoints);
    (window as any).map = setupMap('map', linePoints, {interactionHandlers: this.props.handlers});
  }

  public render() {
    return  <div id="map"></div>;
  }
}

interface Props {
  trackpoints: Coordinate[]
  handlers: InteractionHandlers
}

interface State {
}

export { Map };
