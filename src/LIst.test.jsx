import React from 'react';

import { render, screen } from '@testing-library/react';

import List from './List';

test('todo item이 없으면 할 일이 없어요! 를 보여준다.', () => {
  const { getByText } = render(<List tasks={[]} />);
  getByText('할 일이 없어요!');
});

test('tasks props로 task 데이터를 넘기면 리스트로 보여준다.', () => {
  const todos = [
    { id: 1, title: 'hello' },
    { id: 2, title: 'world' },
  ];

  render(<List tasks={todos} />);
  screen.getByText('hello');
  screen.getByText('world');
});
