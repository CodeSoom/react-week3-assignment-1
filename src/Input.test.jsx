import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByLabelText, getByText } = render((
    <Input onChange={handleChange} onClick={handleClick} />
  ));

  const input = getByLabelText('할 일');

  expect(handleChange).not.toBeCalled();

  fireEvent.change(input, { target: { value: '사용자 입력값' } });

  expect(handleChange).toBeCalledWith(expect.anything());

  expect(input.value).toBe('사용자 입력값');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalledWith(expect.anything());

  fireEvent.change(input, { target: { value: '' } });

  expect(input.value).toBe('');
});
