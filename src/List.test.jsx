import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];
  const handleClickDelete = jest.fn();
  const { container } = render(
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />,
  );
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List', () => {
  const tasks = [{ id: 1, title: '일하기' }];
  const handleClickDelete = jest.fn();
  const { container, getByText } = render(
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />,
  );
  expect(container).toHaveTextContent('일하기');
  expect(container).toHaveTextContent('완료');
  expect(handleClickDelete).not.toBeCalled();
  fireEvent.click(getByText('완료'));

  expect(handleClickDelete).toBeCalledWith(1);
});
