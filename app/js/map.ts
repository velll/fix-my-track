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
import { lastOf } from './lib/array';
import Point from 'ol/geom/Point';
import { toLonLat } from 'ol/proj';

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

let highlightStyle = new Style({
  // fill: new Fill({
  //   color: 'rgba(255,255,255,0.7)',
  // }),
  stroke: new Stroke({
    color: '#3399CC',
    width: 3
  })
});

const styleFunction = function (feature: FeatureLike, res: number): Style {
  const type = feature.getGeometry()!.getType();
  return styles[type];
};

const fit = (map: Map, layer: VectorLayer) => {
  map.getView().fit(layer.getSource().getExtent(), {padding: [25, 25, 25, 25]});
};

const interactions = ({onSelected, onDeSelected, onMoved}: InteractionHandlers): Interaction[] => {
  const select = new Select({});

  select.on('select', e => {
    if (e.selected.length > 0) {
      onSelected(lastOf(e.selected)!.getProperties().index);
    }

    e.deselected.forEach(deselected => {
      onDeSelected(deselected.getProperties().index);
    });
  });

  const modify = new Modify({features: select.getFeatures()});

  modify.on('modifyend', e => {
    const point = e.features.getArray()[0];
    const geometry = point.getGeometry() as Point;

    onMoved(point.getProperties().index, toLonLat(geometry.getCoordinates()));
  });

  return [select, modify];
};

const setupMap = (target: string, route: any, options: MapSetupOptions) => {
  const features = new GeoJSON().readFeatures(route);
  const vectorSource = new VectorSource({features: features});

  const vectorLayer = new VectorLayer({
    source: vectorSource
    // style: styleFunction
  });

  const customInteractions = interactions(options.interactionHandlers);

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

type InteractionHandler = (arg0: number) => void;
type InteractionHandlerExt = (arg0: number, arg1: number[]) => void;

interface MapSetupOptions {
  interactionHandlers: InteractionHandlers
}

interface InteractionHandlers {
  onSelected: InteractionHandler,
  onDeSelected: InteractionHandler,
  onMoved: InteractionHandlerExt
}

export  { setupMap, InteractionHandler, InteractionHandlerExt };
