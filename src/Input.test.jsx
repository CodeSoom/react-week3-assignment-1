import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';

import Input from './Input';

describe('Input component Test', () => {
  describe('1. input 컴포넌트 render 할 때', () => {
    test('label,input,button 출력되어야 함 ', () => {
      const onChange = jest.fn();
      const { getByText, getByPlaceholderText, getByRole } = render(<Input
        value="할일!"
        onChange={onChange}
      />);

      const label = getByText('할 일');
      const input = getByPlaceholderText('할 일을 입력해 주세요');
      const button = getByRole('button');

      expect(label).toHaveTextContent('할 일');
      expect(input.value).toBe('할일!');
      expect(button).toHaveTextContent('추가');
    });
  });

  describe('2. input 에 글자를 입력할 때', () => {
    test('onChange 후 글자가 변경되어야 함 ', () => {
      const onChange = jest.fn();
      const { getByPlaceholderText } = render(<Input onChange={onChange} />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(onChange).not.toHaveBeenCalled();
      expect(input.value).toBe('');

      fireEvent.change(input, { target: { value: 'test code 작성하기' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('test code 작성하기');
    });
  });

  describe('3. 버튼을 클릭했을 때', () => {
    test('onClick 에 할당된 함수가 실행되어야 함', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<Input onClick={onClick} />);

      expect(onClick).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
