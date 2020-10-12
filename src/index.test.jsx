import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('App is rendered without crashing', () => {
  const root = document.createElement('div');

  global.document.getElementById = (id) => id === 'app' && root;

  ReactDOM.render(<App />, document.getElementById('app'));

  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, root);
});
