import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const onClickAddTask = jest.fn();

  const taskTitle = '무언가 입력';

  const { getByDisplayValue, getByText, getByLabelText } = render((
    <Input value="initial value" onChange={handleChange} onClick={onClickAddTask} />
  ));

  expect(getByLabelText('할 일'));

  expect(getByDisplayValue('initial value')).not.toBeNull();
  fireEvent.change(getByLabelText('할 일'), { target: { value: taskTitle } });
  expect(handleChange).toBeCalled();

  expect(onClickAddTask).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(onClickAddTask).toBeCalled();
});
