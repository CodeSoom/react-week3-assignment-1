import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    { id: 1, title: '볶음밥 만들기' },
  ];

  const onClickDelete = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('볶음밥 만들기');

  expect(onClickDelete).not.toBeCalled();
  fireEvent.click(getByText('완료'));
  expect(onClickDelete).toBeCalledWith(1);
});

test('List_Zero', () => {
  const tasks = [];

  const onClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
