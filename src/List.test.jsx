import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('emptyList', () => {
  const tasks = [];
  const { container } = render((
    <List tasks={tasks} />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('filledList', () => {
  const tasks = [{ id: 1, title: '코드짜기' }];
  const { container } = render((
    <List tasks={tasks} />
  ));
  expect(container).toHaveTextContent('코드짜기');
});
