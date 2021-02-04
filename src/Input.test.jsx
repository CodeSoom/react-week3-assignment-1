import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render(
    <Input
      onClick={handleClick}
    />,
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBe('할 일을 입력해 주세요');

  context('Todo를 입력하는 경우', () => {
    it('입력이 변경됨을 표시합니다.', () => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
    });
  });

  context('추가 버튼을 누른 경우', () => {
    it('onClick함수를 실행합니다.', () => {
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
});
