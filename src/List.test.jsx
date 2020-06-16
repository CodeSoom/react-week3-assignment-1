import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List with tasks', () => {
  const tasks = [{
    id: 1,
    title: '테스트 도전하기',
  }];

  const onClickDelete = jest.fn();

  const { container, getByText } = render((
    <List tasks={tasks} onClickDelete={onClickDelete} />
  ));

  expect(container).toHaveTextContent('테스트 도전하기');
  expect(container).toHaveTextContent('완료');

  expect(onClickDelete).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(onClickDelete).toBeCalledWith(1);
});

test('List with no tasks', () => {
  const tasks = [];

  const onClickDelete = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={onClickDelete} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
