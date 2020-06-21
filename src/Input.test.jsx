import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트에', () => {
  const inputText = 'hello';
  const onChange = jest.fn();
  const onClick = jest.fn();

  beforeEach(() => {
    render(
      <Input value="" onChange={onChange} onClick={onClick} />,
    );
  });

  test('\'추가\' 버튼이 있다.', () => {
    screen.getByText(/추가/);
  });

  test('할 일을 입력 후 추가할 수 있다.', () => {
    fireEvent.change(screen.getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: inputText } });
    fireEvent.click(screen.getByText(/추가/));

    expect(onChange).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
  });
});
