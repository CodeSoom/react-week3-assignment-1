import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('tasks 없을 때', () => {
  const tasks = [];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('tasks exist', () => {
  const tasks = [{ id: Date.now(), title: '할일1' }];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
