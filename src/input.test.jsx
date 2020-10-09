import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  // Given
  const { getByTestId } = render(<Input />);
  const input = getByTestId('input-task');
  const inputValue = '게임하기';

  it('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
    // When
    fireEvent.change(input, { target: { value: inputValue } });
    // Then
    expect(input.value).toBe(inputValue);
  });
});
