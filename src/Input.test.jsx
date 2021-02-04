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
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveTextContent('할 일을 입력해 주세요');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();

  it('입력이 변경됨을 표시합니다.', () => {
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), 'TDD 과제하기');
  });
});
