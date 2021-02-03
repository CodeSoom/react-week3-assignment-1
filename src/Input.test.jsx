import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const { getByPlaceholderText, getByText } = render((
    <Input
      value=""
      onChange={onChange}
      onClick={onClick}
    />
  ));
  const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
  expect(placeholder).toBeInTheDocument();

  expect(onChange).not.toBeCalled();
  expect(onClick).not.toBeCalled();
  fireEvent.change(placeholder, { target: { value: '낮잠 자기' } });
  fireEvent.click(getByText('추가'));
  expect(onClick).toBeCalled();
  expect(placeholder).toHaveValue('');
});
