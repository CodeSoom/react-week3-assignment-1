import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = '';

  const handleChangeInput = jest.fn();

  const handleClickButton = jest.fn();

  const {
    container, getByLabelText, getByPlaceholderText, getByText,
  } = render((
    <Input
      value={taskTitle}
      onChange={handleChangeInput}
      onClick={handleClickButton}
    />
  ));

  const label = getByLabelText('할 일');
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const button = getByText('추가');

  expect(container).toContainElement(label);
  expect(container).toContainElement(input);
  expect(container).toContainElement(button);

  expect(handleChangeInput).not.toBeCalled();
  expect(handleClickButton).not.toBeCalled();

  fireEvent.change(input, { target: { value: '뭐라도 하기' } });
  expect(handleChangeInput).toBeCalled();
  expect(input).toHaveTextContent('뭐라도 하기');

  fireEvent.click(button);
  expect(handleClickButton).toBeCalled();
  expect(input).toHaveTextContent('');
});
