import { AnyAction, Reducer } from 'redux';
import { Message } from '../types';

const flashMessagesReducer: Reducer<Message[], AnyAction> = (state: Message[] | undefined = [], action: AnyAction): Message[] => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return [...state, {text: action.text}];
    case 'DISCARD_MESSAGES':
      return [];
    default:
      return state;
  }
};

export default flashMessagesReducer;
