import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      handleClick={handleClick}
    />
  ));

  it('화면에 나타나는 content들을 표시합니다.', () => {
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    // expect(getByPlaceholderText('할 일을 입력해 주세요')).toBe('할 일을 입력해 주세요');
  });

  it('추가버튼을 누르면 handleClick을 호출합니다.', () => {
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});

describe('사용자가 Todo를 입력하는 경우', () => {
  const onChange = jest.fn();

  const { getByPlaceholderText } = render((
    <Input
      onChange={onChange}
    />
  ));
  it('입력이 변경됨을 표시합니다.', () => {
    expect(onChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
    expect(onChange).toBeCalled();
  });
});
