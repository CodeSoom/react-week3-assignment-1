import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List without Item', () => {
  const tasks = [];

  const handleClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with Items', () => {
  const tasks = [
    { id: 1, title: '어렵다...ㅠㅠ' },
  ];

  const handleClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('어렵다...ㅠㅠ');
});
