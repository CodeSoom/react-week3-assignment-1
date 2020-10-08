import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value = '') => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  context('랜더링 되면', () => {
    it('Label, 버튼, placeholder를 표시한다', () => {
      const { getByText, getByPlaceholderText } = renderInput();

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('텍스트가 입력되면', () => {
    it('handleChange()를 호출한다', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value: '운동하기' },
      });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('handleClick()를 호출한다', () => {
      const value = '운동하기';

      const { getByLabelText, getByText } = renderInput(value);
      const input = getByLabelText('할 일');

      expect(input).toHaveDisplayValue('운동하기');

      fireEvent.click(getByText('추가'));

      expect(handleClick).toHaveBeenCalled();
      expect(input).toHaveDisplayValue('');
    });
  });
});
