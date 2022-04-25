import React from 'react';
import ReactDOM from 'react-dom';
import { DAppProvider } from '@usedapp/core';
import App from './App';

ReactDOM.render(
  <DAppProvider>
    <App />
  </DAppProvider>,
  document.getElementById('root')
);
