import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const labelText = '할 일';
  const inputPlaceholderText = '할 일을 입력해 주세요';
  const buttonText = '추가';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value = '') => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows input, label, button elements', () => {
    const { getByText, getByPlaceholderText } = renderInput();

    expect(getByText(labelText)).toBeInTheDocument();
    expect(getByPlaceholderText(inputPlaceholderText)).toBeInTheDocument();
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('shows given value on input', () => {
    const value = '밥 먹기';
    const { getByLabelText } = renderInput(value);
    const input = getByLabelText(labelText);

    expect(input).toHaveValue(value);
  });

  context('when user input', () => {
    it('calls change handler', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText(labelText);

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
    it('calls click handler', () => {
      const { getByText } = renderInput();
      const button = getByText(buttonText);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(button);

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
