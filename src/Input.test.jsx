import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChangeInput = jest.fn();
  const handleClickButton = jest.fn();

  const { getByLabelText, getByPlaceholderText, getByText } = render((
    <Input
      value=""
      onChange={handleChangeInput}
      onClick={handleClickButton}
    />
  ));

  getByLabelText('할 일');

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  expect(handleChangeInput).not.toBeCalled();
  fireEvent.change(input, { target: { value: '뭐라도 하기' } });
  expect(handleChangeInput).toBeCalled();

  const button = getByText('추가');
  expect(handleClickButton).not.toBeCalled();
  fireEvent.click(button);
  expect(handleClickButton).toBeCalled();
});
