import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '물어뜯기 꼬집기 ';
  const handleClick = jest.fn();
  const handleChange = jest.fn();
  const { container, getByLabelText, getByText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));
  const input = getByLabelText('할 일');

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleChange).not.toBeCalled();
  fireEvent.change(input, { target: { value: `${value}깨물기` } });
  expect(handleChange).toBeCalled();

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
  expect(input).toHaveTextContent('');
});
