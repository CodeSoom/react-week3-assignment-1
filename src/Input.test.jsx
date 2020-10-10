import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const inputLabel = '할 일';

  const renderInput = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  context('with value', () => {
    const value = '아무것도 하지 않기';

    it('할 일을 입력한다.', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue('');
      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value } });

      expect(handleChange).toBeCalled();
      expect(input).toHaveDisplayValue(value);
    });

    it('추가 버튼 클릭을 클릭한다.', () => {
      const { getByLabelText, getByText } = renderInput(value);
      const input = getByLabelText(inputLabel);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
      expect(input).toHaveDisplayValue('');
    });
  });

  context('without value', () => {
    const value = '';

    it('해당 태그가 존재하는지 확인한다.', () => {
      const { getByLabelText, getByText } = renderInput(value);

      getByLabelText(inputLabel);
      getByText('추가');
    });
  });
});
