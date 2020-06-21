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
      const { container, getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChangText}
          onClick={handleClick}
        />
      ));

      // Then
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByLabelText('할 일');

      expect(input.value).toBe('');
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

  context('when input text', () => {
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

  context('when click 추가', () => {
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
