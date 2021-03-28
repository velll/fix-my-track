import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { encode } from '../lib/tcx/encode';
import { GlobalState } from '../state/types';
import { HighlightedCode } from './HighlightedCode';

function Export(props: Props) {
  const TCXContents = encode(props.activity);

  const file = new Blob([TCXContents], {type: 'application/xml'});
  const href = URL.createObjectURL(file);

  return  <div className="container">
            <h2 className='title is-2 is-spaced'>Export adjusted tcx</h2>

            <div className='buttons'>
              <a href={href} className="button is-primary" download="processed.tcx">Download</a>
            </div>

            <div>
              <HighlightedCode language="xml">
                {TCXContents}
              </HighlightedCode>
            </div>
          </div>;
}

function mapStateToProps(state: GlobalState) {
  return { activity: state.activity?.processed };
}

const connector = connect(mapStateToProps);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(Export);
