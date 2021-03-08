import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from '../state/store';

function Root(props: Props) {
  return <Provider store={store}>
          <App/>
        </Provider>;
}

interface Props {
}

export default Root;