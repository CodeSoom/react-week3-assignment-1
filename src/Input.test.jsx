import {
  fireEvent, render,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  describe('Given : 입력값이 주어지지 않고', () => {
    test('When : 이벤트가 발생하지 않았을 때', () => {
      const { getByPlaceholderText, container } = render(<Input />);

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(input.value).toBe('');
    });
  });
  describe('Given : 입력값이 주어지면', () => {
    const textContent = '아리 산책가기';
    test('When : 값을 입력했을 때', () => {
      const { getByPlaceholderText, container } = render(<Input />);

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: textContent } });
      expect(input.value).toBe(textContent);
    });
  });
});
