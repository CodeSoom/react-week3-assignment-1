import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const inputRender = (value) => render((
    <Input value={value} onChange={handleChange} onClick={handleClick} />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with value', () => {
    const value = '받아온 문자';

    it('show value in inputbox', () => {
      const { container, getByPlaceholderText } = inputRender(value);

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('받아온 문자');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('without value', () => {
    const value = '';

    it('show placeholder in inputbox', () => {
      const { container, getByPlaceholderText } = inputRender(value);

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('when changing value', () => {
    const value = '';

    it('run onChange event', () => {
      const { getByPlaceholderText } = inputRender(value);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: '입력한 문자' } });

      expect(handleChange).toBeCalled();
    });
  });

  context('when clicking "추가" button', () => {
    const value = '입력한 문자';

    it('run onClick event', () => {
      const { getByText } = inputRender(value);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
