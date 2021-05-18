import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('TodoList', () => {
  const notExistTodoContainer = render(
    (
      <List tasks={[]} />
    ),
  ).container;

  expect(notExistTodoContainer).toHaveTextContent('할 일이 없어요!');

  const tasks = [
    { id: 1, title: '멋대로 살기' },
    { id: 2, title: '아무렇게나 살기' },
  ];

  const todoListContainer = render(
    (
      <List tasks={tasks} />
    ),
  ).container;

  expect(todoListContainer).toHaveTextContent('멋대로 살기');
  expect(todoListContainer).toHaveTextContent('완료');
  expect(todoListContainer).toHaveTextContent('아무렇게나 살기');
  expect(todoListContainer).toHaveTextContent('완료');
});
