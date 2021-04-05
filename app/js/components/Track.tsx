
import React from "react";
import { Map } from "./Map";
import { TrackStats } from "./TrackStats";

import './Track.css';
import { TrackpointRow } from "./TrackpointRow";
import { distanceBetween } from "../lib/distance";
import ExportButtons from './ExportButtons';
import { Activity } from "../models/activity";
import { Extra, InteractionHandlers } from "./TrackContainer";


function Track(props: Props) {
  const activity = props.activity;

  return  <div className="track">
            <Map trackpoints={props.trackpoints} handlers={props.mapInteractionHandlers}></Map>

            <div className="track-data">
              <TrackStats sport={activity.sport} time={activity.totalTime}></TrackStats>

              <h2 className="title is-2">Trackpoints ({props.trackpoints.length})</h2>
              <div className="trackpoint-list">
                <table className="table is-hoverable" ref={props.tableRef}>
                  <tbody>
                    {
                      props.trackpoints.map((point, i, allPoints) => (
                        <TrackpointRow index={i}
                                        key={i}
                                        coordinates={point}
                                        extra={props.extras[i]}
                                        distanceInc={distance(point, i, allPoints)}
                                        highlighted={props.highlighted == i} ></TrackpointRow>
                      ))
                    }
                  </tbody>
                </table>

              </div>
              <ExportButtons save={props.save}/>
            </div>
          </div>;

}

function distance(point: number[], index: number, all: number[][]) {
  return index == 0 ? 0 : distanceBetween(point, all[index - 1]);
}

interface Props {
  activity: Activity,
  mapInteractionHandlers: InteractionHandlers,
  highlighted: number,
  trackpoints: number[][],
  extras: Extra[],
  tableRef: React.RefObject<any>,
  save: () => void
}

export default Track;
