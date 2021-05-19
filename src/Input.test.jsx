/* global given */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  given('render', () => render(<Input onClick={given.clickEvent} />));

  it('렌더링 페이지 텍스트 확인', () => {
    const { container } = given.render;
    expect(container).toHaveTextContent('할 일추가');
  });

  it('placeholder 텍스트 확인', () => {
    const { getByLabelText } = given.render;
    const placeholder = getByLabelText('할 일').placeholder.toString();
    expect(placeholder).toBe('할 일을 입력해 주세요');
  });

  it('add Todo', () => {
    const handleClickAddTodo = jest.fn();
    given('clickEvent', () => handleClickAddTodo);

    const { getByText } = given.render;

    expect(handleClickAddTodo).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTodo).toBeCalled();
  });
});
