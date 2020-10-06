import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  context('without user action', () => {
    it('show input, label, button elements', () => {
      const { getByText, getByPlaceholderText } = render(<Input />);

      getByText('할 일');
      getByPlaceholderText('할 일을 입력해 주세요');
      getByText('추가');
    });
  });
});
