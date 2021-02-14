import * as ol from 'ol';

import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import { defaults as defaultInteractions } from 'ol/interaction';
import { lineStyle } from './styles';
import { fit } from './helpers';
import { interactions, InteractionHandlers, InteractionHandler, InteractionHandlerExt } from './interactions';

(window as any).OpenLayers = ol;

const setupMap = (target: string, route: any, options: MapSetupOptions) => {
  const features = new GeoJSON().readFeatures(route);
  const featuresCollection = new ol.Collection(features);
  const vectorSource = new VectorSource({features: featuresCollection});

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: lineStyle
  });

  (window as any).features = features;
  (window as any).vectorLayer = vectorLayer;

  const customInteractions = interactions(featuresCollection, options.interactionHandlers);

  const map = new Map({
    layers: [
      new TileLayer({source: new OSM()}),
      vectorLayer
    ],
    target: target,
    view: new View({center: [0, 0], zoom: 2}),
    interactions: defaultInteractions().extend(customInteractions)
  });

  fit(map, vectorLayer);

  return map;
};

interface MapSetupOptions {
  interactionHandlers: InteractionHandlers
}
export  { setupMap, InteractionHandler, InteractionHandlerExt };
