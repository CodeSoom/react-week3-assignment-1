import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

test('input에 텍스트가 입력된다.', () => {
  const inputText = 'hello';

  const mockedOnChange = jest.fn();
  const mockedOnClick = jest.fn();

  render(<Input value={undefined} onChange={mockedOnChange} onClick={mockedOnClick} />);
  fireEvent.change(screen.getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: inputText } });
  fireEvent.click(screen.getByText(/추가/));

  expect(mockedOnChange).toBeCalledTimes(1);
  expect(mockedOnClick).toBeCalledTimes(1);
});
