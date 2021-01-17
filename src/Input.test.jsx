import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = '';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(getByLabelText('할 일')).not.toBeNull();
  expect(container).toHaveTextContent('추가');

  fireEvent.change(getByLabelText('할 일'), { target: { value: '입력 값' } });

  expect(handleChange).toBeCalledTimes(1);

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalledTimes(1);
});
