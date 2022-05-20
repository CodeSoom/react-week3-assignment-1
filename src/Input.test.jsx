import {
  fireEvent, render,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('입력값이 주어지지 않으면', () => {
    test('value가 공백이어야 한다.', () => {
      const { getByPlaceholderText, container } = render(<Input />);

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(input).toHaveValue('');
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
      expect(input).toHaveValue(textContent);
    });
  });
});
