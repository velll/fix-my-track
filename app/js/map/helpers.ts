import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
import VectorLayer from "ol/layer/Vector";

const defaultPadding = [25, 25, 25, 25];

const fit = (map: Map, layer: VectorLayer) => {
  map.getView().fit(layer.getSource().getExtent(), {padding: defaultPadding});
};

const isSame = (coordinates1: Coordinate, coordinates2: Coordinate): boolean => {
  return coordinates1[0] == coordinates2[0] && coordinates1[1] == coordinates2[1];
};

export { fit, isSame };
