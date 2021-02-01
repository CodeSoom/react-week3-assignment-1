import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('Empty List', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with Task', () => {
  const { container } = render((
    <List tasks={[]} />
  ));

  expect(container).toHaveTextContent('어서와 TDD는 처음이지?');
});
