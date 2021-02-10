import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const tasks = [];

  const { container } = render((
    <App tasks={tasks} />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('할 일이 없어요!');
});
