import Feature from 'ol/Feature';
import { Modify, Select, Interaction } from 'ol/interaction';
import { toLonLat } from 'ol/proj';
import { pointerMove } from 'ol/events/condition';
import LineString from 'ol/geom/LineString';
import { Collection } from 'ol';

import { highlightStyle } from './styles';
import { isSame } from './helpers';

const forbidden = () => (false);

const interactions = (features: Collection<Feature>, {onSelected, onDeSelected, onMoved}: InteractionHandlers): Interaction[] => {
  const mainFeature = features.item(0);
  const lineString = (mainFeature.getGeometry() as LineString);

  const select = new Select({condition: pointerMove, style: highlightStyle});


  select.on('select', e => {
    if (e.selected.length > 0) {
      const selected = lineString.getClosestPoint(e.mapBrowserEvent.coordinate);
      const selectedIndex = lineString.getCoordinates().findIndex(c  => isSame(c, selected));

      if (selectedIndex > -1) { onSelected(selectedIndex); }
    }
  });

  const modify = new Modify({
    features: features,
    deleteCondition: forbidden,
    insertVertexCondition: forbidden
  });

  modify.on('modifyend', e => {
    const feature = e.features.getArray()[0];
    const lineString = feature.getGeometry() as LineString;
    const newCoordinates = lineString.getCoordinates().map(coordinatePair => toLonLat(coordinatePair));

    onMoved(newCoordinates);
  });

  return [select, modify];
};

type InteractionHandler = (arg0: number) => void;
type InteractionHandlerExt = (arg0: number[][]) => void;

interface InteractionHandlers {
  onSelected: InteractionHandler,
  onDeSelected: InteractionHandler,
  onMoved: InteractionHandlerExt
}

export { interactions, InteractionHandlers, InteractionHandler, InteractionHandlerExt };
