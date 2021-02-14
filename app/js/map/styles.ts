import LineString from "ol/geom/LineString";
import MultiPoint from "ol/geom/MultiPoint";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";

let lineStyle = [
  new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    })
    // fill: new Fill({
    //   color: 'rgba(255,255,0,0.4)',
    // }),
  }),
  new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(255,255,0,0.4)'
      }),
      stroke: new Stroke({
        color: 'blue',
        width: 0.3
      })
    }),
    geometry: function (feature) {
      const geometry = feature.getGeometry() as LineString;
      const coordinates = geometry.getCoordinates();
      return new MultiPoint(coordinates);
    }
  })
];


export { lineStyle };
