import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  let handleChange;
  let handleClick;

  beforeEach(() => {
    handleChange = jest.fn();
    handleClick = jest.fn();
  });

  context('without value', () => {
    it('renders placeholder', () => {
      const value = '';

      const { container } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toBeVisible('할 일을 입력해 주세요');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('with value', () => {
    it('renders value', () => {
      const value = '이미 있는 할일';

      const { container } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toBeVisible(value);
      expect(container).toHaveTextContent('추가');
    });
  });

  context('with events', () => {
    it('fires change and add event', () => {
      const value = '';

      const { getByLabelText, getByText } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      const input = getByLabelText('할 일');

      expect(handleChange).not.toBeCalled();
      fireEvent.change(input, { target: { value: '새로운 할 일' } });
      expect(handleChange).toBeCalled();

      const button = getByText('추가');

      expect(handleClick).not.toBeCalled();
      fireEvent.click(button);
      expect(handleClick).toBeCalled();
    });
  });
});
