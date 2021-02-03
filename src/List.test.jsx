import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List has more than one item', () => {
  const tasks = [
    { id: 1, title: 'testTitle' },
  ];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('testTitle');
});

test('List has no items', () => {
  const tasks = [];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
