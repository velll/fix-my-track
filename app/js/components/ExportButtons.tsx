import React from 'react';

function ExportButtons(props: Props) {
  return <div className="buttons">
          <button className="button is-primary" onClick={props.goToExport}>Looks good</button>
          <button className="button is-ghost" onClick={window.location.reload}>Or go back</button>
        </div>;
}


interface Props {
  goToExport: () => void
}

export { ExportButtons };