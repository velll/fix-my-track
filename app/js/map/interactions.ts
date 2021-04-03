import Feature from 'ol/Feature';
import { Modify, Select, Interaction, Snap } from 'ol/interaction';
import { toLonLat } from 'ol/proj';
import LineString from 'ol/geom/LineString';
import { Collection } from 'ol';
import { isSame } from './helpers';

const forbidden = () => (false);

const interactions = (features: Collection<Feature>, {onSelected, onDeSelected, onMoved}: InteractionHandlers): Interaction[] => {
  const mainFeature = features.item(0);
  const line = (mainFeature.getGeometry() as LineString);

  const select = new Select({});
  // const select = new Select({condition: pointerMove});

  select.on('select', e => {
    if (e.selected.length > 0) {
      const selected = line.getClosestPoint(e.mapBrowserEvent.coordinate);
      const selectedIndex = line.getCoordinates().findIndex(c  => isSame(c, selected));

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

    if (feature == null) { return; }

    const geometry = feature.getGeometry() as LineString;
    const newCoordinates = geometry.getCoordinates().map(coordinatePair => toLonLat(coordinatePair));

    onMoved(newCoordinates);
  });

  const snap = new Snap({features: features, edge: false});

  // Snap should be LAST as it affects all the interactions that follow
  return [select, modify, snap];
};

type InteractionHandler = (arg0: number) => void;
type InteractionHandlerExt = (arg0: number[][]) => void;

interface InteractionHandlers {
  onSelected: InteractionHandler,
  onDeSelected: InteractionHandler,
  onMoved: InteractionHandlerExt
}

export { interactions, InteractionHandlers, InteractionHandler, InteractionHandlerExt };
