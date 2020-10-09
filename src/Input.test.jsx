import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input', () => {
  const placeholdeText = '할 일을 입력해 주세요';
  const buttonText = '추가';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value) => {
    const utils = render((
      <Input
        value={value}
        onClick={handleClick}
        onChange={handleChange}
      />
    ));

    return { ...utils };
  };

  function onChangeTest() {
    expect(handleChange).not.toBeCalled();

    fireEvent.change(
      screen.getByRole('textbox'),
      { target: { value: 'any' } },
    );

    expect(handleChange).toBeCalledTimes(1);
  }

  function onClickTest() {
    expect(handleClick).not.toBeCalled();

    fireEvent.click(screen.getByText(buttonText));

    expect(handleClick).toBeCalledTimes(1);
  }

  context('without value', () => {
    const value = '';

    it('check elements', () => {
      const { getByText, getByPlaceholderText } = renderInput(value);

      getByPlaceholderText(placeholdeText);
      getByText(buttonText);
    });

    it('check functions', () => {
      renderInput(value);

      onChangeTest();
      onClickTest();
    });
  });

  context('with value', () => {
    const value = 'some text';

    it('check elements', () => {
      const { getByText, getByDisplayValue } = renderInput(value);

      getByDisplayValue(value);
      getByText(buttonText);
    });

    it('check functions', () => {
      renderInput(value);

      onChangeTest();
      onClickTest();
    });
  });
});
