import React, {FunctionComponent} from 'react';

function TrackStats({sport, time}: Props) {
  return (
    <div>
      <h2 className="title is-1">{sport}</h2>
      <h4 className="subtitle is-5">Total time: {Math.round(time/60)}m ({time}s)</h4>
    </div>
  );
}

interface Props {
  sport: string,
  time: number
}

export { TrackStats };
