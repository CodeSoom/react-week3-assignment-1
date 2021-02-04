import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();
  const renderInput = (value) => (
    render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ))
  );
  context('With input is empty', () => {
    const value = '';

    it('Show "할 일을 입력해 주세요" in placeholder', () => {
      const { getByLabelText } = renderInput(value);
      expect(getByLabelText('할 일').placeholder).toEqual('할 일을 입력해 주세요');
    });
  });

  context('Without input is empty', () => {
    const value = '엄준식은 살아있다';

    it('onChange works', () => {
      const { getByLabelText } = renderInput(value);

      expect(handleChange).not.toBeCalled();
      fireEvent.change(getByLabelText('할 일'),
        { target: { value: `${value}!` } });
      expect(handleChange).toBeCalled();
    });

    it('onClick works', () => {
      const { getByText, getByLabelText } = renderInput(value);
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
      expect(getByLabelText('할 일')).toHaveTextContent('');
    });
  });
});
