import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('Display empty list when no task', () => {
  const tasks = [];
  const { queryByText } = render((
    <List
      tasks={tasks}
    />
  ));

  const list = queryByText('할 일이 없어요!');

  expect(list.textContent).toContain('할 일이 없어요!');
});

test('Display items when there are tasks', () => {
  const tasks = [{ id: 1, title: 'item #1' }, { id: 2, title: 'item #2' }];
  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('item #1');
  expect(container).toHaveTextContent('item #2');
});
