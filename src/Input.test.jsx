import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const {
    container,
    queryByPlaceholderText,
    getByText,
  } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  /*
   * Check label
   */
  expect(container).toHaveTextContent('할 일');

  /*
   * Check input
   */
  const inputNode = queryByPlaceholderText('할 일을 입력해 주세요');
  expect(inputNode).not.toBeNull();

  expect(handleChange).not.toBeCalled();

  fireEvent.change(inputNode, { target: { value: '뭐라도 하기' } });
  expect(inputNode.value).toBe('뭐라도 하기');

  expect(handleChange).toHaveBeenCalledTimes(1);

  /*
   * Check button
   */
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  const buttonNode = getByText('추가');
  fireEvent.click(buttonNode);

  // expect(handleClick).toBeCalledWith(1);
});
