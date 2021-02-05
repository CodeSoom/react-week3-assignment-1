import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput() {
    const { getByLabelText, getByText } = render((
      <Input
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    return {
      getByLabelText,
      getByText,
    };
  }

  it('updates input value', () => {
    const { getByLabelText } = renderInput();

    const input = getByLabelText('할 일');
    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(input.value).toBe('뭐라도 하기');
    expect(handleClick).not.toBeCalled();
  });

  it('fires handleClick when the button is clicked', () => {
    const { getByText } = renderInput();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
