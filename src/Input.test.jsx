import React from 'react';

import { render, fireEvent } from '@testing-library/react';

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

  context('when user input', () => {
    it('call change handler', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderInput({ onChange });
      const input = getByLabelText('할 일');
      fireEvent.change(input, {
        target: {
          value: '밥 먹기',
        },
      });

      expect(onChange).toBeCalled();
    });
  });

  context('when user click button', () => {
    it('call click handler', () => {
      const onClick = jest.fn();
      const { getByText } = renderInput({ onClick });
      const button = getByText('추가');
      fireEvent.click(button);

      expect(onClick).toBeCalled();
    });
  });
});
