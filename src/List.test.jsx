import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: 'hello',
    },
  ];
  const onClickDelete = jest.fn();
  const { container, rerender } = render((
    <List
      tasks={[]}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');

  rerender((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('hello');
});
