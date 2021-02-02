import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

test('1. 할일이 없을 때', () => {
  const tasks = [];
  render(<List tasks={tasks} />);

  const paragraph = screen.getByText('할 일이 없어요!');

  expect(paragraph).toBeInTheDocument();
});

test('2. 할일이 있을 때', () => {
  const tasks = [
    {
      id: 1,
      title: 'push-up 100회',
    },
    {
      id: 2,
      title: 'squart 100회',
    },
    {
      id: 3,
      title: '달리기 10km',
    },
  ];
  render(<List tasks={tasks} />);

  const todoList = screen.getAllByRole('listitem');

  expect(todoList[0]).toHaveTextContent('push-up 100회');
  expect(todoList[1]).toHaveTextContent('squart 100회');
  expect(todoList[2]).toHaveTextContent('달리기 10km');
});
