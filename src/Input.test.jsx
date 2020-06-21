import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const inputText = 'hello';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('When user does nothing', () => {
    it('Shows placeholder texts', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChange={handleChange} onClick={handleClick} />,
      );

      getByPlaceholderText(/할 일을 입력해 주세요/);
    });
  });

  context('When user enters texts', () => {
    it('Shows texts user entered', () => {
      const { container, getByPlaceholderText } = render(
        <Input onChange={handleChange} onClick={handleClick} />,
      );

      fireEvent.change(getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: inputText } });

      expect(handleChange).toBeCalledTimes(1);
      expect(container.querySelector('input').value).toBe(inputText);
    });

    describe('And user clicks `추가` button', () => {
      it('Adds new todo item', () => {
        const { getByText, getByPlaceholderText } = render(
          <Input onChange={handleChange} onClick={handleClick} />,
        );

        fireEvent.change(getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: inputText } });
        fireEvent.click(getByText(/추가/));

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});
