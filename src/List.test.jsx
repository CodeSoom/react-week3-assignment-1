import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

test('List shows message when tasks is empty', () => {
  const emptyTasks = [];

  const { container } = render((
    <List
      tasks={emptyTasks}
    />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List shows tasks', () => {
  const tasks = [
    {
      id: 1,
      title: '아무것도 하지 않기 #1',
    },
    {
      id: 2,
      title: '아무것도 하지 않기 #2',
    },
  ];

  const handleClickDelete = jest.fn();

  const { container, getAllByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('아무것도 하지 않기 #1');
  expect(container).toHaveTextContent('아무것도 하지 않기 #2');

  const buttons = getAllByText('완료');
  buttons.forEach((button) => {
    fireEvent.click(button);
    expect(handleClickDelete).toBeCalled();
  });
});
