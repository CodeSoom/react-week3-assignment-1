import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';
import List from './List';

test('addTodo', () => {
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input />
  ));

  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});

test('List', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List
      task={task}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});

test('emptyList', () => {
  const task = '';

  const handleClick = jest.fn();

  const { container } = render((
    <List
      task={task}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
