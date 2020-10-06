import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const renderInput = ({
    value = '',
    onChange = () => {},
    onClick = () => {},
  }) => render(
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />,
  );

  context('without user action', () => {
    it('show input, label, button elements', () => {
      const { getByText, getByPlaceholderText } = renderInput({});

      getByText('할 일');
      getByPlaceholderText('할 일을 입력해 주세요');
      getByText('추가');
    });

    it('show given value on input', () => {
      const value = '밥 먹기';
      const { getByLabelText } = renderInput({ value });
      const input = getByLabelText('할 일');

      expect(input).toHaveValue(value);
    });
  });
});
