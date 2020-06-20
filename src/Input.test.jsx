import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';
import { TASK_TITLE } from './mocks/data';

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
      const value = TASK_TITLE;

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

  context('when value is changed and added', () => {
    it('is saved to tasks', () => {
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
      fireEvent.change(input, { target: { value: TASK_TITLE } });
      expect(handleChange).toBeCalled();

      const button = getByText('추가');

      expect(handleClick).not.toBeCalled();
      fireEvent.click(button);
      expect(handleClick).toBeCalled();
    });
  });
});
