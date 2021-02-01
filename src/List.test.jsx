import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('Empty List', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with Task', () => {
  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
  ];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('어서와 TDD는 처음이지?');
});

test('List with multiple Tasks', () => {
  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
    { id: 2, title: '아직 시작도 안했어 ^^' },
  ];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('어서와 TDD는 처음이지?');
  expect(container).toHaveTextContent('아직 시작도 안했어 ^^');
});

test('Clicking 완료 button invokes onClickDelete function', () => {
  const onClickDelete = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={[]}
      onClickDelete={null}
    />
  ));
  expect(onClickDelete).not.toBeCalled();

  expect(container).toHaveTextContent('어서와 TDD는 처음이지?');

  fireEvent.click(getByText('완료'));

  expect(onClickDelete).toBeCalledWith(1);
});
