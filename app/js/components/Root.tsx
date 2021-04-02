import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from '../state/store';
import WaitIndicator from './WaitIndicator';

function Root(props: Props) {
  return <Provider store={store}>
          <WaitIndicator></WaitIndicator>
          <App/>
        </Provider>;
}

interface Props {
}

export default Root;
