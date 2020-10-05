import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByLabelText('할 일');
  expect(input).toHaveDisplayValue('');

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleChange).not.toBeCalled();
  fireEvent.change(input, { target: { value: '입력 값' } });
  expect(input).toHaveDisplayValue('입력 값');
  expect(handleChange).toBeCalled();

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(input).toHaveDisplayValue = '';
  expect(handleClick).toBeCalled();

});
