import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      value="과제하기"
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('Input컴포넌트를 불러온다', () => {
    renderInput();
  });

  it('추가 버튼을 클릭하면 onClick을 호출한다', () => {
    fireEvent.click(renderInput().getByText('추가'));

    expect(handleClick).toHaveBeenCalled();
  });

  it('onChange를 호출한다', () => {
    const inputNode = renderInput().getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputNode, { target: { value: '과제 열심히 하기' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
