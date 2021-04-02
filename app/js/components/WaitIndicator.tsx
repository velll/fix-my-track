import React, {FunctionComponent} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '../state/types';
import './WaitIndicator.css';

function WaitIndicator(props: Props) {
  const display = props.waits > 0 ? 'block' : 'none';

  return (
    <div style={{display: display}} className="spin-container">
      <div className="spin" id="loader"></div>
      <div className="spin" id="loader2"></div>
      <div className="spin" id="loader3"></div>
      <div className="spin" id="loader4"></div>
    </div>
  );
}

function mapStateToProps(state: GlobalState) {
  return { waits: state.waits };
}

const mapDispatch = {
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(WaitIndicator);
