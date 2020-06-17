import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

test('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const { container, getByText } = render((
    <Input
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  ));
  const inputBox = container.querySelector('#input-task-title');

  expect(container).toHaveTextContent('할 일');
  expect(inputBox).toBeInTheDocument();
  expect(container).toHaveTextContent('추가');
  expect(inputBox.value).toBe('');

  expect(handleChangeTitle).not.toBeCalled();
  expect(handleClickAddTask).not.toBeCalled();

  fireEvent.change(inputBox, { target: { value: 'Distribute new version' } });
  expect(inputBox.value).toBe('Distribute new version');
  expect(handleChangeTitle).toBeCalledTimes(1);

  fireEvent.click(getByText('추가'));
  expect(handleClickAddTask).toBeCalledTimes(1);
});
