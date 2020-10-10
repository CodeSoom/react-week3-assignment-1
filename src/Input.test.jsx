import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input value={value} onChange={handleChange} onClick={handleClick} />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with value', () => {
    const value = '저녁에 할 일';

    it('show value in inputbox', () => {
      const { container, getByPlaceholderText } = renderInput(value);

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue(value);
      expect(container).toHaveTextContent('추가');
    });
  });

  context('without value', () => {
    const value = '';

    it('show placeholder in inputbox', () => {
      const { container, getByPlaceholderText } = renderInput(value);

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue(value);
      expect(container).toHaveTextContent('추가');
    });
  });

  context('when changing value', () => {
    const value = '';

    it('run onChange event', () => {
      const { getByPlaceholderText } = renderInput(value);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: '낮에 할 일' } });

      expect(handleChange).toBeCalled();
    });
  });

  context('when clicking "추가" button', () => {
    const value = '저녁에 할 일';

    it('run onClick event', () => {
      const { getByText } = renderInput(value);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
