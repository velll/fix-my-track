import * as ol from 'ol';

import 'ol/ol.css';
import Feature, { FeatureLike } from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

(window as any).OpenLayers = ol;

let styles: {[key: string]: Style} = {
  'LineString': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1
    })
  })
};

let styleFunction = function (feature: FeatureLike, res: number): Style {
  const type = feature.getGeometry()!.getType();
  return styles[type];
};

const fit = (map: Map, feature: Feature) => {
  map.getView().fit(feature.getGeometry()!.getExtent(), {padding: [25, 25, 25, 25]});
};

const setupMap = (target: string, route: any) => {

  const features = new GeoJSON().readFeatures(route);
  let vectorSource = new VectorSource({features: features});

  let vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
  });

  const map = new Map({
    layers: [
      new TileLayer({source: new OSM()}),
      vectorLayer
    ],
    target: target,
    view: new View({center: [0, 0], zoom: 2})
  });

  fit(map, features[0]);

  return map;
};


export  { setupMap };
