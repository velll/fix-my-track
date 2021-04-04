import React from 'react';
import { Message } from '../state/types';

function FlashMessage(props: Props) {
  return <div className="notification is-danger is-light"
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave} > { props.message.text } </div>;
}

interface Props {
  message: Message
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default FlashMessage;
