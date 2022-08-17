import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('할 일이 입력되면', () => {
    it('input의 value가 변경된다', () => {
      const handleChange = jest.fn();
      const handleClick = jest.fn();

      const { container, getByText, getByPlaceholderText } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      expect(handleChange).not.toBeCalled();
      expect(handleClick).not.toBeCalled();

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: '잠자기',
        },
      });
      expect(input.value).toBe('잠자기');
      expect(handleChange).toBeCalled();
    });
  });

  context('추가 버튼이 클릭되면', () => {
    it('handleClick 함수가 실행된다', () => {
      const handleChange = jest.fn();
      const handleClick = jest.fn();

      const { container, getByText } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));
    });
  });
});
