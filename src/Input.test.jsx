import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

test('input과 button으로 이루어져 있는지 확인한다.', () => {
  const utils = render(<Input />);
  const { getByText, getByPlaceholderText } = utils;

  getByText('할 일');
  getByText('추가');
  getByPlaceholderText('할 일을 입력해 주세요');
});
