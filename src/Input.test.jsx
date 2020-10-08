import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

test('Input - no task title', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const inputNode = screen.getByLabelText('username');

  expect(inputNode).toHaveTextContent('');
});

test('Input - has task title', () => {
  const taskTitle = '뭐라도 하기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('추가');
});

test('Input - clear on click', () => {
  const taskTitle = '뭐라도 하기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');

  fireEvent.click(getByText('추가'));

  expect(onChangeTitle).toBeCalled();
  expect(onClickAddTask).toBeCalled();
});
