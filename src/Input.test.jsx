import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input - no task title', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('추가');

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '뭐라도 하기' } });

  fireEvent.click(getByText('추가'));

  expect(taskTitle).toEqual('');
});

test('Input - has task title', () => {
  const taskTitle = '뭐라도 하기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByPlaceholderText } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('추가');
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBe('');
});

test('Input - clear on click', () => {
  const taskTitle = '뭐라도 하기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { getByText } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  fireEvent.click(getByText('추가'));

  expect(onChangeTitle).toBeCalled();
  expect(onClickAddTask).toBeCalled();
});
