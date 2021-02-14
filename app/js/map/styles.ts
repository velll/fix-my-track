import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";

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

const highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(255,255,255,0.7)'
  }),
  stroke: new Stroke({
    color: 'red',
    width: 3
  })
});

const styleFunction = function (feature: FeatureLike, res: number): Style {
  const type = feature.getGeometry()!.getType();
  return styles[type];
};

const lineStringStyle = new Style({
  stroke: new Stroke({
    color: '#3399CC',
    lineCap: 'square',
    width: 3
  })
});

export { styles, highlightStyle, styleFunction, lineStringStyle };
