import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByText, getByLabelText } = render((
    <div>
      <Input
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    </div>
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByLabelText('할 일');

  expect(input).toHaveAttribute('id', 'input-task-title');
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');

  expect(onChangeTitle).toHaveBeenCalledTimes(0);
  expect(input).toHaveAttribute('value', '');
  fireEvent.change(input, { target: { value: 'do something' } });
  expect(onChangeTitle).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue('do something');

  expect(onClickAddTask).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(onClickAddTask).toBeCalled();

  expect(input).toHaveAttribute('value', '');
});
