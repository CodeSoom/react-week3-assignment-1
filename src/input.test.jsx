import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트에 input,button을 눌렀을때', () => {
  it('input 에 placeholder 와 button이 잘 작동하는지', () => {
    const { getByPlaceholderText, getByText } = render(<Input />);
    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');
  });
});
