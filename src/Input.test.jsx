import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const placeholderText = '할 일을 입력해 주세요';
  const buttonText = '추가';

  const setup = ({
    value,
    handleClick = jest.fn(),
    handleChange = jest.fn(),
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

  const onClickTest = ({ handleClick }) => {
    const { getByText } = screen;

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText(buttonText));
    expect(handleClick).toBeCalledTimes(1);
  };

  const onChangeTest = ({ handleChange }) => {
    const input = screen.getByRole('textbox');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(input, { target: { value: 'any' } });
    expect(handleChange).toBeCalledTimes(1);
  };

  context('without value', () => {
    const value = '';
    const handleClick = jest.fn();
    const handleChange = jest.fn();

    it('Basic', () => {
      const { getByText, getByPlaceholderText } = setup({ value });

      getByPlaceholderText(placeholderText);
      getByText(buttonText);
    });

    it('onChange', () => {
      setup({ handleChange });

      onChangeTest({ handleChange });
    });

    it('onClick', () => {
      setup({ handleClick });

      onClickTest({ handleClick });
    });
  });

  context('with value', () => {
    const value = '추가된 할 일';
    const handleClick = jest.fn();
    const handleChange = jest.fn();

    it('Basic', () => {
      const { getByText, getByPlaceholderText } = setup({ value });

      getByPlaceholderText(placeholderText);
      getByText(buttonText);
    });

    it('onChange', () => {
      setup({ handleChange });

      onChangeTest({ handleChange });
    });

    it('onClick', () => {
      setup({ handleClick });

      onClickTest({ handleClick });
    });
  });
});
