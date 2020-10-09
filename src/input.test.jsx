import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('컴포넌트 렌딩 시, labal, placeholder, button 텍스트를 출력한다.', () => {
  const { getByText, getByPlaceholderText } = render(<Input />);

  expect(getByText('할 일')).toBeInTheDocument();
  expect(getByText('추가')).toBeInTheDocument();
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
});

test('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
  const { getByTestId } = render(<Input />);
  const input = getByTestId('input-task');
  const inputTitle = '캠핑하기';

  fireEvent.change(input, { target: { value: inputTitle } });

  expect(input.value).toBe(inputTitle);
});
