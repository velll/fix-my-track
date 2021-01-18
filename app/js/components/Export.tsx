import React from 'react';
import { Activity } from '../activity';

function Export(props: Props) {
  const TCXContents = props.activity.toTCX();

  const file = new Blob([TCXContents], {type: 'application/xml'});
  const href = URL.createObjectURL(file);

  return <div className="container">
          <a href={href} download="processed.tcx">Download</a>
          <div>Exporting!</div>
          <div>
            {TCXContents}
          </div>

        </div>;
}

interface Props {
  activity: Activity
}

export { Export };