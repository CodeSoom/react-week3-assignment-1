import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  context('exist taskTitle', () => {
    const taskTitle = '아무것도 하지 않기';
    const inputLabel = '할 일';

    it('할 일을 입력한다.', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue('');
      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: taskTitle } });

      expect(handleChange).toBeCalled();
      expect(input).toHaveDisplayValue(taskTitle);
    });

    it('추가 버튼 클릭을 클릭한다.', () => {
      const { getByLabelText, getByText } = renderInput();
      const input = getByLabelText(inputLabel);

      expect(handleClick).not.toBeCalled();

      fireEvent.change(input, { target: { value: taskTitle } });
      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
      expect(input).toHaveDisplayValue('');
    });
  });
});
