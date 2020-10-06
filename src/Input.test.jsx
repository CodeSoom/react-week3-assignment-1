import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByLabelText, getByText } = render((
    <Input onChange={handleChange} onClick={handleClick} />
  ));

  const input = getByLabelText('할 일');

  context('typing text', () => {
    expect(handleChange).not.toBeCalled();

    it('change input value', () => {
      fireEvent.change(input, { target: { value: 'text' } });
    });

    it('onChange function to be called', () => {
      expect(handleChange).toBeCalledWith(expect.anything());
    });

    it('Verify that the value has changed', () => {
      expect(input.value).toBe('text');
    });
  });

  context('click Button or press Enter', () => {
    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    it('onClick function to be called', () => {
      expect(handleClick).toBeCalledWith(expect.anything());
    });

    it('initialize input value', () => {
      fireEvent.change(input, { target: { value: '' } });
    });

    it('Verify that the value has changed', () => {
      expect(input.value).toBe('');
    });
  });
});
