import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const handleChange = jest.fn();
const handleClick = jest.fn();

describe('Input changes', () => {
  context('when type in', () => {
    it('changes text field', () => {
      const { getByPlaceholderText } = render((
        <Input
          id="input-task-title"
          onChange={handleChange}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: '테스트' } });

      expect(input.value).toBe('테스트');
    });
  });
});

describe('Input reset ', () => {
  context('when click add', () => {
    it('empty text field', () => {
      const value = '';
      const { getByPlaceholderText, getByText } = render((
        <Input
          id="input-task-title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: '테스트' } });

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledTimes(1);

      expect(input.value).toBe('');
    });
  });
});
