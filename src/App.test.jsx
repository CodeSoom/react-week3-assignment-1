import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const state = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const { container, getByText } = render((
    <App />
  ));

  expect(container).toHaveTextContent('');

});
