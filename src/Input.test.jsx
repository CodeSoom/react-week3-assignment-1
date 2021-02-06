import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input onClick={onClick} />
  ));
  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(container).toHaveTextContent('할 일');

  fireEvent.change(input, { target: { value: '코드숨 과제' } });

  expect(input.value).toBe('코드숨 과제');

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onClick).toBeCalled();
});
