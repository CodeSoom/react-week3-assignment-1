import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('컴포넌트 렌딩 시, labal, placeholder, button 텍스트를 표시한다', () => {
  // Given
  const { getByText, getByPlaceholderText } = render(<Input />);

  // When
  // Then
});

test('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
  // Given
  const { getByTestId } = render(<Input />);
  const input = getByTestId('input-task');
  const inputValue = '게임하기';

  // When
  fireEvent.change(input, { target: { value: inputValue } });
  // Then
  expect(input.value).toBe(inputValue);
});
