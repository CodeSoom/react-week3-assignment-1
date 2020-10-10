import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('input 값을 변경할 때', () => {
    it('input 값이 표시된다', () => {
      const { getByPlaceholderText } = render(<Input onChange={handleChange} />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toBeCalled();
      fireEvent.change(input, {
        target: {
          value: '공부 하기',
        },
      });
      expect(handleChange).toBeCalled();
      expect(input).toHaveValue('공부 하기');
    });
  });

  context('추가 버튼을 누를 때', () => {
    it('버튼 이벤트가 실행된다', () => {
      const { getByText } = render(<Input onClick={handleClick} />);
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
});
