import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('When text changed', () => {
    it('hanlde change values', () => {
      const handleChange = jest.fn();
      const handleClick = jest.fn();

      const { container, getByText, getByPlaceholderText } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleChange).not.toBeCalled();
      expect(handleClick).not.toBeCalled();

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(input).toBeEnabled();

      fireEvent.change(input, { target: { value: 'something' } });
      expect(input.value).toBe('something');
      fireEvent.change(input, { target: { value: 'something' } });
      expect(input.value).not.toBe('else');
      expect(handleChange).toBeCalled();


      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
  context('When click button', () => {
    it('click add button', () => {
      const handleChange = jest.fn();
      const handleClick = jest.fn();

      const { getByText, getByPlaceholderText } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: 'something' } });

      fireEvent.click(getByText('추가'));
      expect(document.querySelector('input').getAttribute('value')).not.toEqual('something');
    });
  });
});
