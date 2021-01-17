import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('랜더링 되면', () => {
    it('Label, 버튼, placeholder를 표시한다', () => {
      const value = '';

      const { getByText, getByPlaceholderText } = renderInput(value);

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('텍스트가 입력되면', () => {
    it('화면에 표시한다', () => {
      const value = '운동하기';

      const { getByLabelText } = renderInput(value);

      expect(getByLabelText('할 일')).toHaveDisplayValue('운동하기');
    });

    it('handleChange()를 호출한다', () => {
      const value = '운동하기';

      const { getByLabelText } = renderInput(value);
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value: '산책하기' },
      });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('handleClick()를 호출한다', () => {
      const value = '운동하기';

      const { getByText } = renderInput(value);

      expect(handleClick).not.toHaveBeenCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
