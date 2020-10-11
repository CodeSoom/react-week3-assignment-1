import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const task = '과제하기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByText, getByPlaceholderText } = render((
    <Input
      value={task}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  context('When type input value', () => {
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    it('show typed value', () => {
      fireEvent.change(input, { target: { value: task } });
      expect(input.value).toEqual(task);
    });

    it('handleChange is called ', () => {
      expect(handleChange).not.toBeCalled();
      fireEvent.change(input, { target: { value: '과제하기2' } });
      expect(handleChange).toBeCalled();
    });
  });

  context('When click add-button', () => {
    const addButton = getByText('추가');

    it('handleClick is called', () => {
      expect(handleClick).not.toBeCalled();

      fireEvent.click(addButton);

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
