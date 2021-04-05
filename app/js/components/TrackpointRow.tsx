import React from 'react';
import { round } from '../lib/round';
import { Coordinate } from "ol/coordinate";
import { Extra } from "./TrackContainer";

function TrackpointRow({index, coordinates, extra, distanceInc, highlighted}: Props) {
  return (
    <tr className={highlighted ? 'highlight' : undefined}>
      <th> {index + 1} </th>
      <td> {new Date(extra.time).toLocaleTimeString()} </td>
      <td> {round(distanceInc, 1)}m </td>
      <td> {coordinates[1]} </td>
      <td> {coordinates[0]} </td>
    </tr>
  );
}

interface Props {
  index: number,
  coordinates: Coordinate,
  extra: Extra,
  distanceInc: number,
  highlighted: boolean
}

export { TrackpointRow };
