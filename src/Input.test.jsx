import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderUtil = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />));

  context('when typing text', () => {
    it('onChange function to be called', () => {
      const { getByLabelText } = renderUtil();

      expect(handleChange).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: 'text' } });

      expect(handleChange).toBeCalledWith(expect.anything());
    });

    it('Verify that the value has changed', () => {
      const { getByLabelText } = renderUtil('text');

      expect(getByLabelText('할 일').value).toBe('text');
    });
  });

  context('when typing Empty', () => {
    window.alert = jest.fn();

    it('alert "할일을 입력하세요!"', () => {

    });
  });

  context('when click Button or press Enter', () => {
    it('onClick function to be called', () => {
      const { getByText } = renderUtil();

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledWith(expect.anything());
    });

    it('initialize input value', () => {
      const { getByLabelText } = renderUtil();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '' } });
    });

    it('Verify that the value has changed', () => {
      const { getByLabelText } = renderUtil('');

      expect(getByLabelText('할 일').value).toBe('');
    });
  });
});
