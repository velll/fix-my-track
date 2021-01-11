import * as ol from 'ol';

import 'ol/ol.css';
import Feature, { FeatureLike } from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import { Modify, Select, Interaction, defaults as defaultInteractions } from 'ol/interaction';

(window as any).OpenLayers = ol;

const styles: {[key: string]: Style} = {
  'Point': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 4
    })
  }),
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

const styleFunction = function (feature: FeatureLike, res: number): Style {
  const type = feature.getGeometry()!.getType();
  return styles[type];
};

const fit = (map: Map, feature: Feature) => {
  map.getView().fit(feature.getGeometry()!.getExtent(), {padding: [25, 25, 25, 25]});
};

const interactions = (): Interaction[] => {
  const select = new Select({});

  return [
    select,
    new Modify({features: select.getFeatures()})
  ];
};

const setupMap = (target: string, route: any) => {

  const features = new GeoJSON().readFeatures(route);
  const vectorSource = new VectorSource({features: features});

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
  });

  const map = new Map({
    layers: [
      new TileLayer({source: new OSM()}),
      vectorLayer
    ],
    target: target,
    view: new View({center: [0, 0], zoom: 2}),
    interactions: defaultInteractions().extend(interactions())
  });

  fit(map, features[0]);

  return map;
};


export  { setupMap };
