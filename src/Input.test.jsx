import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트에', () => {
  const inputText = 'hello';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <Input value="" onChange={onChange} onClick={onClick} />,
  );

  test('할 일을 입력 후 추가할 수 있다.', () => {
    fireEvent.change(getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: inputText } });
    fireEvent.click(getByText(/추가/));

    expect(onChange).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
  });
});
