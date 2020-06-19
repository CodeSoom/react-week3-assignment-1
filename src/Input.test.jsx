import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe(
  'Input', () => {
    let handleChange;
    let handleClick;

    beforeEach(() => {
      handleChange = jest.fn();
      handleClick = jest.fn();
    });

    context('without values', () => {
      it('should not be inputted', () => {
        const value = '';

        const { getByPlaceholderText } = render((
          <Input
            value={value}
            onChange={handleChange}
            onClick={handleClick}
          />
        ));

        const input = getByPlaceholderText('할 일을 입력해 주세요');

        fireEvent.change(input, { target: { value: '새로운 할 일 1' } });
        expect(input.value).toBe('');
      });
    });
    context('with values', () => {
      it('should be inputted', () => {
        const value = '새로운 할 일 1';

        const { getByPlaceholderText } = render((
          <Input
            value={value}
            onChange={handleChange}
            onClick={handleClick}
          />
        ));

        const input = getByPlaceholderText('할 일을 입력해 주세요');

        fireEvent.change(input, { target: { value: '새로운 할 일 2' } });
        expect(input.value).toBe('새로운 할 일 1');
      });
    });
  },
);
