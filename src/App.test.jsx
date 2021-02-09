import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { getByText } = render((
    <App />
  ));

  expect(getByText(/To-do/)).not.toBeNull();
  expect(getByText(/할 일이 없어요!/));
});
