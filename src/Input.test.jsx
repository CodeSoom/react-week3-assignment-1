import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const setup = ({
    value,
    handleChange = jest.fn(),
    handleClick = jest.fn(),
  }) => {
    const utils = render(
      <Input
        value={value}
        onClick={handleClick}
        onChange={handleChange}
      />,
    );

    return { ...utils };
  };

  function handleChangeTest(input, handleChange) {
    expect(handleChange).not.toBeCalled();

    fireEvent.change(
      input,
      { target: { value: 'any' } },
    );

    expect(handleChange).toBeCalledTimes(1);

    for (let i = 0; i < 4; i += 1) {
      fireEvent.change(
        input,
        { target: { value: `${i}` } },
      );
    }

    expect(handleChange).toBeCalledTimes(5);
  }

  function handleClickTest(button, handleClick) {
    expect(handleClick).not.toBeCalled();

    fireEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);

    for (let i = 0; i < 8; i += 1) {
      fireEvent.click(button);
    }

    expect(handleClick).toBeCalledTimes(9);
  }

  context('empty value', () => {
    const value = '';
    const placeholder = '할 일을 입력해 주세요';

    it('input placeholder is "할 일을 입력해 주세요"', () => {
      const { getByPlaceholderText } = setup({ value });
      const input = getByPlaceholderText(placeholder);

      expect(input.getAttribute('placeholder'))
        .toEqual(placeholder);
    });

    it('handleChange 호출 확인', () => {
      const handleChange = jest.fn();

      const { getByPlaceholderText } = setup({ value, handleChange });

      handleChangeTest(getByPlaceholderText(placeholder), handleChange);
    });

    it('handleClick 호출 확인', () => {
      const handleClick = jest.fn();

      const { getByText } = setup({ value, handleClick });

      handleClickTest(getByText('추가'), handleClick);
    });
  });

  context('exist value', () => {
    const value = 'some text';

    it('input.value equal value', () => {
      const { getByDisplayValue } = setup({ value });
      const input = getByDisplayValue(value);

      expect(input.value).toEqual(value);
    });

    it('handleChange 호출 확인', () => {
      const handleChange = jest.fn();

      const { getByDisplayValue } = setup({ value, handleChange });

      handleChangeTest(getByDisplayValue(value), handleChange);
    });

    it('handleClick 호출 확인', () => {
      const handleClick = jest.fn();

      const { getByText } = setup({ value, handleClick });

      handleClickTest(getByText('추가'), handleClick);
    });
  });
});
