import React, {FunctionComponent} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DISCARD_MESSAGES } from '../state/actions/flash_messages';
import { GlobalState } from '../state/types';
import FlashMessage from './FlashMessage';

const TIMEOUT = 5000;

class FlashMessages extends React.Component<Props, {}> {
  timer?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);

    this.clearTimeout = this.clearTimeout.bind(this);
    this.discardLater = this.discardLater.bind(this);
  }

  componentDidUpdate() {
    if (this.props.messages.length > 0) {
      this.discardLater();
    }
  }

  clearTimeout() {
    if (this.timer) { clearTimeout(this.timer); }
  }

  discardLater() {
    this.clearTimeout();
    this.timer = setTimeout(this.props.discardAll, TIMEOUT);
  }

  render() {
    return  <div className="flash-container">
              { this.props.messages.map((message, index) => (
                  <FlashMessage key={index}
                                message={message}
                                onMouseEnter={this.clearTimeout}
                                onMouseLeave={this.discardLater} />
              )) }
            </div>;
  }
}

function mapStateToProps(state: GlobalState) {
  return { messages: state.flashMessages };
}

const mapDispatch = {
  discardAll: () => DISCARD_MESSAGES
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(FlashMessages);
