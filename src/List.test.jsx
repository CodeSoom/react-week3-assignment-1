import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
