import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('ListWithoutTasks', () => {
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

test('ListWithTasks', () => {
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

  expect(container).toHaveTextContent('첫 번째 할 일');
  expect(container).toHaveTextContent('완료');
});
