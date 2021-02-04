import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  function renderInput() {
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    const { getByLabelText, getByText } = render((
      <Input
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    return {
      getByLabelText,
      getByText,
      handleChange,
      handleClick,
    };
  }

  it('updates input value', () => {
    const { getByLabelText, handleClick } = renderInput();

    const input = getByLabelText('할 일');
    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(input.value).toBe('뭐라도 하기');
    expect(handleClick).not.toBeCalled();
  });

  it('fires handleClick when the button is clicked', () => {
    const { getByText, handleClick } = renderInput();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
