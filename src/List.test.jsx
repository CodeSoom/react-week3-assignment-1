import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('Without tasks', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('With tasks', () => {
  const tasks = [{
    id: 1,
    title: '첫 번째 할 일',
  }];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent(tasks[0].title);
  expect(container).toHaveTextContent('완료');
});

test('Done task', () => {
  const tasks = [{
    id: 1,
    title: '첫 번째 할 일',
  }];

  const handleClick = jest.fn();

  const { getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalled();
});
