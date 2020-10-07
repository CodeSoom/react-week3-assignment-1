import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value = '') => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('without user action', () => {
    it('show input, label, button elements', () => {
      const { getByText, getByPlaceholderText } = renderInput();

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
    });

    it('show given value on input', () => {
      const value = '밥 먹기';
      const { getByLabelText } = renderInput(value);
      const input = getByLabelText('할 일');

      expect(input).toHaveValue(value);
    });
  });

  context('when user input', () => {
    it('call change handler', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText('할 일');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, {
        target: {
          value: '밥 먹기',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('when user click button', () => {
    it('call click handler', () => {
      const { getByText } = renderInput();
      const button = getByText('추가');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(button);

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
