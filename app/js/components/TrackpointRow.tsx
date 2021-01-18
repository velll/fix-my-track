import { Trackpoint } from "../activity";
import React from 'react';
import { round } from '../lib/round';

function TrackpointRow({index, point, distanceInc, highlighted}: Props) {
  return (
    <tr className={highlighted ? 'highlight' : undefined}>
      <th> {index + 1} </th>
      <td> {new Date(point.time).toLocaleTimeString()} </td>
      <td> {round(distanceInc, 1)}m </td>
      <td> {point.lat} </td>
      <td> {point.long} </td>
    </tr>
  );
}

interface Props {
  index: number,
  point: Trackpoint,
  distanceInc: number,
  highlighted: boolean
}

export { TrackpointRow };