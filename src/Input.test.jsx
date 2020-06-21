import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('without value', () => {
    it('no display value', () => {
      // Given
      const value = '';
      const handleChangText = jest.fn();
      const handleClick = jest.fn();

      // When
      const { container } = render((
        <Input
          value={value}
          onChange={handleChangText}
          onClick={handleClick}
        />
      ));

      // Then
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('with value', () => {
    it('display value', () => {
      // Given
      const value = '첫 번째 할 일';
      const handleChangText = jest.fn();
      const handleClick = jest.fn();

      // When
      const { getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChangText}
          onClick={handleClick}
        />
      ));

      // Then
      const input = getByLabelText('할 일');

      expect(input.value).toBe(value);
    });
  });

  context('input text', () => {
    it('call handleChangText function', () => {
      // Given
      const value = '';
      const handleChangText = jest.fn();
      const handleClick = jest.fn();

      // When
      const { getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChangText}
          onClick={handleClick}
        />
      ));

      // Then
      fireEvent.change(getByLabelText('할 일'), { target: { value: '첫 번째 할 일' } });

      expect(handleChangText).toBeCalled();
    });
  });

  context('완료 button click', () => {
    it('call handleClick function', () => {
      // Given
      const value = '';
      const handleChangText = jest.fn();
      const handleClick = jest.fn();

      // When
      const { getByText } = render((
        <Input
          value={value}
          onChange={handleChangText}
          onClick={handleClick}
        />
      ));

      // Then
      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
