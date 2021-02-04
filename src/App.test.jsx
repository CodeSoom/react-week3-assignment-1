import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('Page', () => {
  const { container } = render((
    <App />
  ));
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이 없어요!');
});
