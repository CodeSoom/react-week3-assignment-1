import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  it('Input "input 에 placeholder , button이 작동하는지"', () => {
    const { getByPlaceholderText, getByText } = render(<Input />);
    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');
  });
});
