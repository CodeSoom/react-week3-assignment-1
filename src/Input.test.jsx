import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const placeholdeText = '할 일을 입력해 주세요';
  const buttonText = '추가';

  const setup = ({
    value,
    handleChange = jest.fn(),
    handleClick = jest.fn(),
  }) => {
    const utils = render((
      <Input
        value={value}
        onClick={handleClick}
        onChange={handleChange}
      />
    ));

    return { ...utils };
  };

  function onChangeTest({ handleChange }) {
    const input = screen.getByRole('textbox');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: 'any' } });

    expect(handleChange).toBeCalledTimes(1);
  }

  function onClickTest({ handleClick }) {
    const { getByText } = screen;

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText(buttonText));

    expect(handleClick).toBeCalledTimes(1);
  }

  context('without value', () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    it('check elements', () => {
      const { getByText, getByPlaceholderText } = setup({ value });

      getByPlaceholderText(placeholdeText);
      getByText(buttonText);
    });

    it('check functions', () => {
      setup({ value, handleChange, handleClick });

      onChangeTest({ handleChange });
      onClickTest({ handleClick });
    });
  });

  context('with value', () => {
    const value = 'some text';
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    it('check elements', () => {
      const { getByText, getByDisplayValue } = setup({ value });

      getByDisplayValue(value);
      getByText(buttonText);
    });

    it('check functions', () => {
      setup({ value, handleChange, handleClick });

      onChangeTest({ handleChange });
      onClickTest({ handleClick });
    });
  });
});
