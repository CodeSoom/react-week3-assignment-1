import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

const listRender = (tasks, deleteClickHandler) => (
  <List
    tasks={tasks}
    onClickDelete={deleteClickHandler}
  />
);

test('빈 List', () => {
  const deleteClickHandler = jest.fn();

  const { container } = render(listRender([], deleteClickHandler));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('todo가 있는 List ', () => {
  const deleteClickHandler = jest.fn();

  const tasks = [{ id: 1, title: '할일1' }, { id: 2, title: '할일2' }];

  const { container, getAllByText } = render(listRender(tasks, deleteClickHandler));

  expect(container).toHaveTextContent('할일1');
  expect(container).toHaveTextContent('할일2');

  getAllByText('완료').forEach((v) => {
    fireEvent.click(v);
    expect(deleteClickHandler).toBeCalled();
  });
});
