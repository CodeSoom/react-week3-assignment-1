import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List - no task', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(handleClick).not.toBeCalled();
});

test('List - tasks have task', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '코드숨 과제하기',
    },
  ];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('코드숨 과제하기');
  expect(handleClick).not.toBeCalled();
});
